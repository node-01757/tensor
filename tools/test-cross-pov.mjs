// node --test tools/
// Eleggibilità (requires.for_profiling), ambiguità delle evidenze, confronto cross-POV.
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { Profiler } from '../prototype/js/engine/profiler.js';
import { DIMENSIONS } from '../prototype/js/data/dimensions.js';
import { DNA } from '../prototype/js/data/dna.js';
import { getPov } from '../prototype/js/data/scenes.js';
import { buildCrossPovObservations, FORBIDDEN_IN_REVEAL } from '../prototype/js/engine/cross-pov.js';

const store = new Map();
globalThis.localStorage = {
  getItem: k => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: k => store.delete(k)
};
beforeEach(() => store.clear());

const RT = 4000;
const sig = (dimension_id, direction, magnitude = 2) => ({ dimension_id, direction, magnitude });

// Gioca una scelta reale dai dati del gioco
function play(p, povId, sceneId, nodeIndex, key, responseTimeMs = RT) {
  const pov = getPov(povId);
  const scene = pov.scenes.find(s => s.scene_id === sceneId);
  const choice = scene.nodes[nodeIndex].choices.find(c => c.key === key);
  p.recordChoice({
    signals: choice.effects.profile_signals,
    responseTimeMs,
    scene: { scene_id: sceneId, pov_id: povId, prototype_id: scene.prototype_activated, domain: scene.domain, actually_measures: scene.actually_measures },
    choice: { key, nodeIndex, narrative_flags: choice.narrative_flags, kobayashi: !!choice.kobayashi }
  });
  return choice;
}

// ---------- Eleggibilità ----------

test('la Maschera (min 3 sessioni) è grezza finché le sessioni non bastano, poi conta retroattivamente', () => {
  const p = new Profiler(DIMENSIONS, undefined, DNA);
  play(p, 'sara', 'riunione_mercoledi', 0, 'A'); // conformismo, fuga, compliance
  assert.equal(p.isPrototypeEligible('la_maschera'), false);

  let s = p.getCumulativeSummary().find(x => x.dimensionId === 'confronto_vs_fuga');
  assert.equal(s, undefined, 'nessuna osservazione eleggibile → la dimensione non compare');
  assert.equal(p.getEvidence('confronto_vs_fuga').length, 1, 'ma l\'evidenza grezza è conservata');
  assert.equal(p.getEvidence('confronto_vs_fuga')[0].eligible, false);

  for (let i = 0; i < 3; i++) p.completeRun();
  assert.equal(p.isPrototypeEligible('la_maschera'), true);
  s = p.getCumulativeSummary().find(x => x.dimensionId === 'confronto_vs_fuga');
  assert.equal(s.observations, 1, 'retroattivo: la stessa evidenza ora conta');
});

test('il Testimone (nessun requisito) è eleggibile da subito', () => {
  const p = new Profiler(DIMENSIONS, undefined, DNA);
  play(p, 'enrico', 'riunione_mercoledi', 0, 'A');
  assert.equal(p.isPrototypeEligible('il_testimone'), true);
  assert.ok(p.getCumulativeSummary().find(x => x.dimensionId === 'conformismo_vs_autonomia'));
});

test('il summary espone le osservazioni grezze e i prototipi in attesa', () => {
  const p = new Profiler(DIMENSIONS, undefined, DNA);
  play(p, 'enrico', 'riunione_mercoledi', 0, 'A'); // testimone: eleggibile
  play(p, 'sara', 'riunione_mercoledi', 0, 'B');   // maschera: grezza
  const s = p.getCumulativeSummary().find(x => x.dimensionId === 'conformismo_vs_autonomia');
  assert.equal(s.observations, 1);
  assert.equal(s.rawObservations, 1);
  assert.deepEqual(s.pendingPrototypes, ['la_maschera']);
});

test('la stabilità si calcola solo sulle evidenze eleggibili', () => {
  const p = new Profiler(DIMENSIONS, undefined, DNA);
  // 6 segnali dal Sopravvissuto (min 3 sessioni): tutti grezzi
  for (let i = 0; i < 6; i++) play(p, 'marco', 'audit_venerdi', 1, 'A');
  assert.equal(p.getCumulativeSummary().find(x => x.dimensionId === 'protezione_vs_interesse_personale'), undefined);
});

test('un prototipo senza DNA non blocca: eleggibile, ma known=false', () => {
  const p = new Profiler(DIMENSIONS, undefined, DNA);
  const e = p.prototypeEligibility('il_prototipo_inesistente');
  assert.equal(e.eligible, true);
  assert.equal(e.known, false);
});

test('una condizione non supportata viene esposta ma non blocca', () => {
  const dna = { x: { requires: { for_profiling: [{ condition: 'requires_prototype_observed', value: 'il_custode' }] } } };
  const p = new Profiler(DIMENSIONS, undefined, dna);
  const e = p.prototypeEligibility('x');
  assert.equal(e.eligible, true);
  assert.equal(e.unmet[0].unsupported, true);
});

// ---------- Ambiguità: stessa condotta, pressioni diverse ----------

test('"fuga" dalla Maschera e "fuga" dal Testimone restano distinguibili per provenienza', () => {
  const p = new Profiler(DIMENSIONS, undefined, DNA);
  play(p, 'sara', 'riunione_mercoledi', 1, 'B');   // la_maschera: lo lasci andare → fuga
  play(p, 'enrico', 'fermata_domenica', 0, 'B');   // il_testimone: resti dove sei → (verifica sotto)
  const groups = p.getEvidenceByPrototype('confronto_vs_fuga');
  const ids = groups.map(g => g.prototypeId).sort();
  assert.ok(ids.includes('la_maschera'));
  const maschera = groups.find(g => g.prototypeId === 'la_maschera');
  assert.equal(maschera.eligible, false, 'sotto coercizione, senza baseline: grezza');
  assert.ok(maschera.entries[0].narrativeFlags.length > 0, 'l\'evidenza porta i flag narrativi');
  assert.equal(maschera.entries[0].povId, 'sara');
});

test('il profilo di run non filtra per eleggibilità: il reveal di fine storia vede tutto', () => {
  const p = new Profiler(DIMENSIONS, undefined, DNA);
  play(p, 'sara', 'riunione_mercoledi', 0, 'A');
  assert.ok(p.getProfileSummary().find(x => x.dimensionId === 'confronto_vs_fuga'));
});

// ---------- Cross-POV: evidenze, non etichette ----------

test('Enrico chiama Luca, Sara tiene la maschera: divergenza sullo stesso evento', () => {
  const p = new Profiler(DIMENSIONS, undefined, DNA);
  play(p, 'enrico', 'riunione_mercoledi', 0, 'A'); // autonomia, confronto
  p.completeRun();
  play(p, 'sara', 'riunione_mercoledi', 0, 'A');   // conformismo, fuga, compliance
  const cmp = p.compareScene('riunione_mercoledi');
  const conf = cmp.find(c => c.dimensionId === 'confronto_vs_fuga');
  assert.equal(conf.relation, 'divergent');
  assert.deepEqual(conf.povs.map(x => [x.povId, x.direction]).sort(), [['enrico', 'confronto'], ['sara', 'fuga']]);
  // La Maschera è grezza per il profilo stabile, ma il confronto cross-POV la vede:
  // il confronto è sulla storia, non sul profilo.
});

test('Enrico chiama Luca, Sara manda la mail: gesti diversi, stessa direzione', () => {
  const p = new Profiler(DIMENSIONS, undefined, DNA);
  play(p, 'enrico', 'riunione_mercoledi', 0, 'A'); // confronto 1
  p.completeRun();
  play(p, 'sara', 'riunione_mercoledi', 0, 'C');   // kobayashi: mail → confronto 1, reframing 2
  const conf = p.compareScene('riunione_mercoledi').find(c => c.dimensionId === 'confronto_vs_fuga');
  assert.equal(conf.relation, 'convergent');
  const flagsA = conf.povs.find(x => x.povId === 'enrico').entries[0].narrativeFlags;
  const flagsB = conf.povs.find(x => x.povId === 'sara').entries[0].narrativeFlags;
  assert.notDeepEqual(flagsA, flagsB, 'condotte diverse');
});

test('il testo cross-POV nomina le mosse e il sapere asimmetrico, mai un giudizio', () => {
  const p = new Profiler(DIMENSIONS, undefined, DNA);
  play(p, 'enrico', 'riunione_mercoledi', 0, 'A');
  p.completeRun();
  play(p, 'sara', 'riunione_mercoledi', 0, 'A');
  const obs = buildCrossPovObservations({
    currentPov: 'sara',
    otherPovs: ['enrico'],
    comparisonsByScene: { riunione_mercoledi: p.compareScene('riunione_mercoledi') },
    getPov
  });
  assert.equal(obs.length, 1);
  const t = obs[0];
  assert.match(t, /^Mercoledì\./);
  assert.match(t, /Da Enrico: «/);
  assert.match(t, /Da Sara: «/);
  assert.match(t, /sapeva/);
  for (const w of FORBIDDEN_IN_REVEAL) assert.ok(!t.toLowerCase().includes(w), `parola vietata: ${w} in "${t}"`);
});

test('con un solo POV non c\'è confronto', () => {
  const p = new Profiler(DIMENSIONS, undefined, DNA);
  play(p, 'enrico', 'riunione_mercoledi', 0, 'A');
  assert.deepEqual(p.compareScene('riunione_mercoledi'), []);
});

test('le evidenze sopravvivono al reload e l\'eleggibilità si rivaluta', () => {
  const p = new Profiler(DIMENSIONS, undefined, DNA);
  play(p, 'sara', 'riunione_mercoledi', 0, 'A');
  p.completeRun(); p.completeRun(); p.completeRun();
  const again = new Profiler(DIMENSIONS, undefined, DNA);
  assert.equal(again.getEvidence('confronto_vs_fuga')[0].eligible, true);
  assert.equal(again.getSessionsCompleted(), 3);
});

test('il timeout non produce evidenze', () => {
  const p = new Profiler(DIMENSIONS, undefined, DNA);
  p.recordTimeout({ scene: { scene_id: 'riunione_mercoledi', pov_id: 'sara', prototype_id: 'la_maschera' }, nodeIndex: 0, defaultKey: 'B' });
  assert.deepEqual(p.compareScene('riunione_mercoledi'), []);
  assert.equal(p.getEvidence('confronto_vs_fuga').length, 0);
});
