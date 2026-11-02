// node --test tools/
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { Profiler } from '../prototype/js/engine/profiler.js';
import { DIMENSIONS } from '../prototype/js/data/dimensions.js';

// localStorage minimale per Node
const store = new Map();
globalThis.localStorage = {
  getItem: k => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: k => store.delete(k)
};

const scene = (prototype_id, domain, measures) => ({
  scene_id: `s_${prototype_id}`,
  prototype_id,
  domain,
  actually_measures: measures
});
const CUSTODE = scene('il_custode', 'sociale', [
  { dimension_id: 'protezione_vs_interesse_personale', measurement_mode: 'direct', weight: 1 },
  { dimension_id: 'controllo_vs_accettazione', measurement_mode: 'masked', weight: 0.9 }
]);
const LIMITE = scene('il_limite', 'corpo', [
  { dimension_id: 'protezione_vs_interesse_personale', measurement_mode: 'direct', weight: 0.8 }
]);
const sig = (dimension_id, direction, magnitude = 2) => ({ dimension_id, direction, magnitude });
const NORMAL_RT = 4000; // nessuna modulazione

beforeEach(() => store.clear());

test('il segnale è pesato da actually_measures', () => {
  const p = new Profiler(DIMENSIONS);
  p.recordChoice({ signals: [sig('controllo_vs_accettazione', 'controllo')], responseTimeMs: NORMAL_RT, scene: CUSTODE });
  const d = p.profile.controllo_vs_accettazione;
  assert.equal(d.score, -2 * 0.9); // controllo = polarity_a → negativo
  assert.equal(d.byMode.masked, 1);
});

test('dimensione non dichiarata dalla scena → incidental, peso 0.3', () => {
  const p = new Profiler(DIMENSIONS);
  p.recordChoice({ signals: [sig('confronto_vs_fuga', 'fuga')], responseTimeMs: NORMAL_RT, scene: CUSTODE });
  const d = p.profile.confronto_vs_fuga;
  assert.ok(Math.abs(d.score - 0.6) < 1e-9);
  assert.equal(d.byMode.incidental, 1);
});

test('il response time modula', () => {
  const p = new Profiler(DIMENSIONS);
  p.recordChoice({ signals: [sig('protezione_vs_interesse_personale', 'protezione')], responseTimeMs: 1000, scene: CUSTODE });
  assert.equal(p.profile.protezione_vs_interesse_personale.score, -2 * 1.2);
});

test('direzione non valida viene scartata', () => {
  const p = new Profiler(DIMENSIONS);
  p.recordChoice({ signals: [sig('protezione_vs_interesse_personale', 'coraggio')], responseTimeMs: NORMAL_RT, scene: CUSTODE });
  assert.equal(p.profile.protezione_vs_interesse_personale.observations, 0);
});

test('il timeout non sposta i punteggi', () => {
  const p = new Profiler(DIMENSIONS);
  p.recordTimeout({ scene: CUSTODE, nodeIndex: 0, defaultKey: 'B' });
  assert.equal(p.getTotalObservations(), 0);
  assert.equal(p.getRunTimeouts().length, 1);
});

test('startRun azzera la run ma non il cumulativo; il cumulativo persiste', () => {
  const p = new Profiler(DIMENSIONS);
  p.recordChoice({ signals: [sig('protezione_vs_interesse_personale', 'protezione')], responseTimeMs: NORMAL_RT, scene: CUSTODE });
  p.completeRun();
  p.startRun();
  assert.equal(p.getTotalObservations(), 0);

  const reloaded = new Profiler(DIMENSIONS);
  assert.equal(reloaded.getSessionsCompleted(), 1);
  assert.equal(reloaded.getCumulativeSummary()[0].observations, 1);
});

test('stabilità richiede prototipi e domini distinti', () => {
  const p = new Profiler(DIMENSIONS);
  const s = sig('protezione_vs_interesse_personale', 'protezione');
  for (let i = 0; i < 6; i++) p.recordChoice({ signals: [s], responseTimeMs: NORMAL_RT, scene: CUSTODE });
  let st = p.getCumulativeSummary()[0].stability;
  assert.equal(st.stable, false);
  assert.deepEqual(st.missing, ['prototypes', 'domains']);

  p.recordChoice({ signals: [s], responseTimeMs: NORMAL_RT, scene: LIMITE });
  st = p.getCumulativeSummary()[0].stability;
  assert.equal(st.stable, true);
});

test('regola anti-overfitting: oltre il 70% mascherato non è stabile', () => {
  const p = new Profiler(DIMENSIONS);
  const s = sig('controllo_vs_accettazione', 'controllo');
  const CORPO_MASKED = scene('il_corpo_mortale', 'corpo', [
    { dimension_id: 'controllo_vs_accettazione', measurement_mode: 'masked', weight: 1 }
  ]);
  for (let i = 0; i < 3; i++) p.recordChoice({ signals: [s], responseTimeMs: NORMAL_RT, scene: CUSTODE });
  for (let i = 0; i < 2; i++) p.recordChoice({ signals: [s], responseTimeMs: NORMAL_RT, scene: CORPO_MASKED });
  const st = p.getCumulativeSummary()[0].stability;
  assert.equal(st.maskedRatio, 1);
  assert.deepEqual(st.missing, ['masked_ratio']);
});

test('fasi di confidenza', () => {
  const p = new Profiler(DIMENSIONS);
  assert.equal(p.getConfidencePhase(), 'silent');
  for (let i = 0; i < 5; i++) p.completeRun();
  assert.equal(p.getConfidencePhase(), 'light');
  for (let i = 0; i < 15; i++) p.completeRun();
  assert.equal(p.getConfidencePhase(), 'meta');
});

test('summary: tendencyCount coerente anche per lealta (bug label accentata)', () => {
  const p = new Profiler(DIMENSIONS);
  const DEB = scene('il_debitore', 'sociale', [{ dimension_id: 'lealta_vs_giustizia', measurement_mode: 'direct', weight: 1 }]);
  p.recordChoice({ signals: [sig('lealta_vs_giustizia', 'lealta')], responseTimeMs: NORMAL_RT, scene: DEB });
  p.recordChoice({ signals: [sig('lealta_vs_giustizia', 'lealta')], responseTimeMs: NORMAL_RT, scene: DEB });
  p.recordChoice({ signals: [sig('lealta_vs_giustizia', 'giustizia', 1)], responseTimeMs: NORMAL_RT, scene: DEB });
  const s = p.getProfileSummary()[0];
  assert.equal(s.tendency, 'lealta');
  assert.equal(s.tendencyCount, 2);
  assert.equal(s.polarityA, 'lealta');
});

test('scena legacy senza actually_measures: comportamento v0.2', () => {
  const p = new Profiler(DIMENSIONS);
  p.recordChoice({ signals: [sig('confronto_vs_fuga', 'fuga')], responseTimeMs: NORMAL_RT, scene: {} });
  assert.equal(p.profile.confronto_vs_fuga.score, 2);
});
