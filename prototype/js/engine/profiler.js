// TENSOR — Silent Profiler v1.1
//
// Due livelli:
//  - run        → il profilo della singola partita (un POV). Si azzera a ogni run.
//                 Alimenta il reveal di fine storia e le barre dimensionali.
//  - cumulative → il "tensor" del giocatore. Persistente in localStorage,
//                 sopravvive tra run e tra storie. È l'unico stato cross-story.
//                 Conserva le EVIDENZE (segnali con provenienza), non i totali:
//                 i totali si ricalcolano in lettura, così l'eleggibilità
//                 può cambiare retroattivamente.
//
// Regole applicate (TENSOR_schemas_v1.md §2, §3, §5):
//  - ogni segnale è pesato da actually_measures della scena (weight × modulazione RT)
//  - segnali su dimensioni non dichiarate dalla scena → 'incidental', peso INCIDENTAL_WEIGHT
//  - il response time modula, non stabilizza mai da solo
//  - requires.for_profiling del DNA: un'osservazione è "grezza" finché le condizioni
//    non sono soddisfatte. Le osservazioni grezze restano registrate ma non
//    contribuiscono al profilo stabile. Quando le condizioni vengono soddisfatte,
//    contano anche retroattivamente ("non contribuisce finché...").
//  - stabilità: min osservazioni eleggibili, prototipi distinti, domini distinti,
//    max_masked_only_ratio
//  - soglie di confidenza progressiva per numero di sessioni completate
//  - timeout: non è una scelta. Registrato a parte, non sposta i punteggi.
//
// Il profiler non giudica: conserva evidenze con la loro provenienza
// (POV, scena, prototipo, pressione) e le confronta. Mai etichette.

const CUMULATIVE_KEY = 'tensor_profile_v1';
const LEGACY_KEY = 'tensor_profile';
const SCHEMA_VERSION = 2;

export const PROFILER_CONFIG = {
  fastThresholdMs: 2200,
  slowThresholdMs: 7000,
  fastMultiplier: 1.2,
  slowMultiplier: 0.8,
  incidentalWeight: 0.3,
  maxSignalsPerDimension: 2000,
  stability: {
    min_total_observations: 4,
    min_distinct_prototypes: 2,
    min_distinct_domains: 2,
    max_masked_only_ratio: 0.7
  },
  // Sessioni completate → fase (schema §5, "Soglie di confidenza progressiva")
  confidencePhases: [
    { minSessions: 20, id: 'meta' },
    { minSessions: 10, id: 'calibrated' },
    { minSessions: 5, id: 'light' },
    { minSessions: 0, id: 'silent' }
  ]
};

const MODES = ['direct', 'masked', 'incidental'];

function storageGet(key) {
  try { return globalThis.localStorage?.getItem(key) ?? null; } catch { return null; }
}
function storageSet(key, value) {
  try { globalThis.localStorage?.setItem(key, value); } catch { /* storage pieno o bloccato */ }
}
function storageRemove(key) {
  try { globalThis.localStorage?.removeItem(key); } catch { /* noop */ }
}

export class Profiler {
  // dna: mappa prototype_id → DNA (vedi data/dna.js). Senza DNA tutto è eleggibile.
  constructor(dimensions, config = PROFILER_CONFIG, dna = {}) {
    this.dimensions = dimensions;
    this.dimById = Object.fromEntries(dimensions.map(d => [d.id, d]));
    this.config = config;
    this.dna = dna;
    this.run = this._emptyStore();
    this.cumulative = this._loadCumulative();
    storageRemove(LEGACY_KEY);
  }

  // Compatibilità: barre e reveal leggono profiler.profile[dimId].observations
  get profile() {
    const out = {};
    for (const d of this.dimensions) out[d.id] = this._aggregate(this.run.signals[d.id], () => true);
    return out;
  }

  // ---- Ciclo di vita ----

  startRun() {
    this.run = this._emptyStore();
  }

  completeRun() {
    this.cumulative.sessionsCompleted++;
    this.cumulative.lastSessionAt = Date.now();
    this._save();
  }

  resetAll() {
    this.run = this._emptyStore();
    this.cumulative = this._emptyCumulative();
    this._save();
  }

  // ---- Registrazione ----

  // scene: { scene_id, prototype_id, domain, actually_measures, pov_id }
  // choice: { key, narrative_flags, kobayashi, nodeIndex, text }
  recordChoice({ signals = [], responseTimeMs, scene = {}, choice = {}, kobayashi = false }) {
    const rtModifier = this._rtModifier(responseTimeMs);
    const measures = this._indexMeasures(scene.actually_measures);
    const isKobayashi = kobayashi || !!choice.kobayashi;

    for (const store of [this.run, this.cumulative]) {
      store.choices++;
      if (isKobayashi) store.kobayashi++;
    }

    for (const signal of signals) {
      const dimDef = this.dimById[signal.dimension_id];
      if (!dimDef) continue;
      if (signal.direction !== dimDef.polarity_a && signal.direction !== dimDef.polarity_b) continue;

      const declared = measures ? measures[signal.dimension_id] : { measurement_mode: 'direct', weight: 1 };
      const mode = declared && MODES.includes(declared.measurement_mode) ? declared.measurement_mode : 'incidental';
      const weight = declared ? declared.weight : this.config.incidentalWeight;
      const sign = signal.direction === dimDef.polarity_b ? 1 : -1;

      const entry = {
        direction: signal.direction,
        magnitude: signal.magnitude,
        weight,
        mode,
        rtModifier,
        adjusted: signal.magnitude * weight * rtModifier * sign,
        responseTimeMs,
        // provenienza: l'evidenza porta con sé il contesto in cui è nata
        povId: scene.pov_id ?? null,
        sceneId: scene.scene_id ?? null,
        prototypeId: scene.prototype_id ?? null,
        domain: scene.domain ?? null,
        choiceKey: choice.key ?? null,
        nodeIndex: choice.nodeIndex ?? null,
        narrativeFlags: choice.narrative_flags || [],
        kobayashi: isKobayashi,
        timestamp: Date.now()
      };

      this._push(this.run, signal.dimension_id, entry);
      this._push(this.cumulative, signal.dimension_id, entry);
    }

    this._save();
  }

  // Il timer è scaduto: la storia prosegue con il default, ma il profilo non attribuisce
  // al giocatore una posizione che non ha preso.
  recordTimeout({ scene = {}, nodeIndex = null, defaultKey = null }) {
    const entry = {
      povId: scene.pov_id ?? null,
      sceneId: scene.scene_id ?? null,
      prototypeId: scene.prototype_id ?? null,
      nodeIndex,
      defaultKey,
      timestamp: Date.now()
    };
    this.run.timeouts.push(entry);
    this.cumulative.timeouts.push(entry);
    if (this.cumulative.timeouts.length > 500) this.cumulative.timeouts.shift();
    this._save();
  }

  // ---- Eleggibilità (requires.for_profiling) ----

  // Un prototipo è eleggibile quando tutte le sue condizioni for_profiling sono
  // soddisfatte dallo stato cumulativo corrente. Valutato in lettura → retroattivo.
  isPrototypeEligible(prototypeId) {
    return this.prototypeEligibility(prototypeId).eligible;
  }

  prototypeEligibility(prototypeId) {
    const dna = prototypeId ? this.dna[prototypeId] : null;
    if (!dna) return { eligible: true, unmet: [], known: !!dna };
    const unmet = [];
    for (const req of dna.requires?.for_profiling || []) {
      if (req.condition === 'min_sessions_completed') {
        if (this.cumulative.sessionsCompleted < req.value) unmet.push({ ...req, current: this.cumulative.sessionsCompleted });
      } else {
        // Condizione non ancora supportata: non blocca, ma viene esposta
        unmet.push({ ...req, unsupported: true });
      }
    }
    const blocking = unmet.filter(u => !u.unsupported);
    return { eligible: blocking.length === 0, unmet, known: true };
  }

  _isEligible(entry) {
    return this.isPrototypeEligible(entry.prototypeId);
  }

  // ---- Lettura: run corrente ----

  getProfileSummary() {
    return this._summarize(this.run, () => true);
  }

  // 0 = tutto polarity_a, 1 = tutto polarity_b, 0.5 = equilibrio o nessun dato.
  getNormalizedScore(dimensionId) {
    return this._normalized(this._aggregate(this.run.signals[dimensionId], () => true));
  }

  getTotalObservations() {
    return this.dimensions.reduce((n, d) => n + this.run.signals[d.id].length, 0);
  }

  getRunTimeouts() {
    return [...this.run.timeouts];
  }

  // ---- Lettura: profilo cumulativo ----

  getSessionsCompleted() {
    return this.cumulative.sessionsCompleted;
  }

  getConfidencePhase() {
    const n = this.cumulative.sessionsCompleted;
    return this.config.confidencePhases.find(p => n >= p.minSessions).id;
  }

  // Solo evidenze eleggibili entrano nei totali. Le grezze sono conteggiate a parte.
  getCumulativeSummary() {
    const elig = e => this._isEligible(e);
    return this._summarize(this.cumulative, elig).map(s => {
      const all = this.cumulative.signals[s.dimensionId];
      const raw = all.filter(e => !elig(e));
      return {
        ...s,
        rawObservations: raw.length,
        pendingPrototypes: [...new Set(raw.map(e => e.prototypeId).filter(Boolean))],
        stability: this._stability(this._aggregate(all, elig))
      };
    });
  }

  getStableDimensions() {
    return this.getCumulativeSummary().filter(s => s.stability.stable);
  }

  // Evidenze grezze di una dimensione, con provenienza. Nessuna aggregazione.
  getEvidence(dimensionId, { eligibleOnly = false } = {}) {
    const all = this.cumulative.signals[dimensionId] || [];
    return all
      .filter(e => !eligibleOnly || this._isEligible(e))
      .map(e => ({ ...e, eligible: this._isEligible(e) }));
  }

  // Le stesse evidenze, raggruppate per prototipo: la stessa direzione nata da
  // pressioni diverse resta distinguibile.
  getEvidenceByPrototype(dimensionId) {
    const groups = {};
    for (const e of this.getEvidence(dimensionId)) {
      const g = groups[e.prototypeId] || (groups[e.prototypeId] = { prototypeId: e.prototypeId, countA: 0, countB: 0, score: 0, eligible: e.eligible, entries: [] });
      const dimDef = this.dimById[dimensionId];
      if (e.direction === dimDef.polarity_a) g.countA++; else g.countB++;
      g.score += e.adjusted;
      g.entries.push(e);
    }
    return Object.values(groups);
  }

  // Confronto cross-POV su uno stesso evento (scene_id condiviso).
  // Per ogni dimensione con evidenze da ≥2 POV nella stessa scena:
  //   relation 'divergent'  → direzioni opposte (stessa stanza, mosse diverse)
  //   relation 'convergent' → stessa direzione (gesti diversi, stessa strategia)
  // Restituisce evidenze, non verdetti. Il testo lo costruisce il reveal.
  // I segnali 'incidental' sono esclusi: collaterali deboli, non reggono un confronto.
  compareScene(sceneId) {
    const out = [];
    for (const dimDef of this.dimensions) {
      const byPov = {};
      for (const e of this.cumulative.signals[dimDef.id]) {
        if (e.sceneId !== sceneId || !e.povId || e.mode === 'incidental') continue;
        const p = byPov[e.povId] || (byPov[e.povId] = { povId: e.povId, prototypeId: e.prototypeId, score: 0, entries: [] });
        p.score += e.adjusted;
        p.entries.push(e);
      }
      const povs = Object.values(byPov).filter(p => p.score !== 0);
      if (povs.length < 2) continue;
      for (const p of povs) p.direction = p.score < 0 ? dimDef.polarity_a : dimDef.polarity_b;
      const directions = new Set(povs.map(p => p.direction));
      out.push({
        sceneId,
        dimensionId: dimDef.id,
        relation: directions.size === 1 ? 'convergent' : 'divergent',
        povs,
        magnitude: povs.reduce((m, p) => m + Math.abs(p.score), 0)
      });
    }
    return out.sort((a, b) => b.magnitude - a.magnitude);
  }

  // Contraddizione cumulativa: dimensione stabile in cui entrambi i poli pesano
  // almeno minShare del totale eleggibile. È un'osservazione, non una diagnosi.
  getContradictions(minShare = 0.3) {
    return this.getStableDimensions().filter(s => {
      if (s.weightedTotal === 0) return false;
      const shareB = (s.weightedTotal + s.score) / 2 / s.weightedTotal;
      return shareB >= minShare && 1 - shareB >= minShare;
    });
  }

  // ---- Interni ----

  _push(store, dimensionId, entry) {
    const arr = store.signals[dimensionId];
    arr.push(entry);
    if (arr.length > this.config.maxSignalsPerDimension) arr.splice(0, arr.length - this.config.maxSignalsPerDimension);
  }

  _aggregate(entries, filter) {
    const agg = {
      score: 0, weightedTotal: 0, observations: 0, countA: 0, countB: 0,
      byMode: { direct: 0, masked: 0, incidental: 0 }, prototypes: {}, domains: {}, signals: []
    };
    for (const e of entries || []) {
      if (!filter(e)) continue;
      agg.score += e.adjusted;
      agg.weightedTotal += Math.abs(e.adjusted);
      agg.observations++;
      // polarity_a → negativo
      if (e.adjusted < 0) agg.countA++; else agg.countB++;
      agg.byMode[e.mode]++;
      if (e.prototypeId) agg.prototypes[e.prototypeId] = (agg.prototypes[e.prototypeId] || 0) + 1;
      if (e.domain) agg.domains[e.domain] = (agg.domains[e.domain] || 0) + 1;
      agg.signals.push(e);
    }
    return agg;
  }

  _summarize(store, filter) {
    const summary = [];
    for (const def of this.dimensions) {
      const d = this._aggregate(store.signals[def.id], filter);
      if (d.observations === 0) continue;
      const towardsA = d.score < 0;
      const tendency = towardsA ? def.polarity_a : def.polarity_b;
      summary.push({
        dimensionId: def.id,
        label: def.label,
        tendency,
        oppositePolarity: towardsA ? def.polarity_b : def.polarity_a,
        polarityA: def.polarity_a,
        polarityB: def.polarity_b,
        labelA: def.label_a,
        labelB: def.label_b,
        score: d.score,
        weightedTotal: d.weightedTotal,
        strength: Math.abs(d.score),
        normalized: this._normalized(d),
        observations: d.observations,
        countA: d.countA,
        countB: d.countB,
        tendencyCount: towardsA ? d.countA : d.countB,
        byMode: d.byMode,
        prototypes: d.prototypes,
        maskedRatio: (d.byMode.masked + d.byMode.incidental) / d.observations,
        hasContradiction: d.countA > 0 && d.countB > 0
      });
    }
    return summary.sort((a, b) => b.observations - a.observations);
  }

  _normalized(d) {
    if (!d || d.weightedTotal === 0) return 0.5;
    return (d.score / d.weightedTotal + 1) / 2;
  }

  _stability(d) {
    const rules = this.config.stability;
    const prototypes = Object.keys(d.prototypes).length;
    const domains = Object.keys(d.domains).length;
    const maskedRatio = d.observations ? (d.byMode.masked + d.byMode.incidental) / d.observations : 0;
    const missing = [];
    if (d.observations < rules.min_total_observations) missing.push('observations');
    if (prototypes < rules.min_distinct_prototypes) missing.push('prototypes');
    if (domains < rules.min_distinct_domains) missing.push('domains');
    if (maskedRatio > rules.max_masked_only_ratio) missing.push('masked_ratio');
    return { stable: missing.length === 0, missing, prototypes, domains, maskedRatio, observations: d.observations };
  }

  _rtModifier(ms) {
    if (typeof ms !== 'number') return 1;
    if (ms < this.config.fastThresholdMs) return this.config.fastMultiplier;
    if (ms > this.config.slowThresholdMs) return this.config.slowMultiplier;
    return 1;
  }

  // null = scena legacy senza actually_measures: tutto 'direct' peso 1 (comportamento v0.2)
  _indexMeasures(measures) {
    if (!Array.isArray(measures) || measures.length === 0) return null;
    return Object.fromEntries(measures.map(m => [m.dimension_id, m]));
  }

  _emptyStore() {
    const signals = {};
    for (const d of this.dimensions) signals[d.id] = [];
    return { signals, timeouts: [], kobayashi: 0, choices: 0 };
  }

  _emptyCumulative() {
    return { version: SCHEMA_VERSION, sessionsCompleted: 0, lastSessionAt: null, ...this._emptyStore() };
  }

  _loadCumulative() {
    const fresh = this._emptyCumulative();
    const raw = storageGet(CUMULATIVE_KEY);
    if (!raw) return fresh;
    try {
      const saved = JSON.parse(raw);
      if (saved.version !== SCHEMA_VERSION) {
        // v1 salvava totali, non evidenze: non migrabile senza inventare provenienze.
        // Si conserva il conteggio sessioni, che è l'unico dato affidabile.
        return { ...fresh, sessionsCompleted: saved.sessionsCompleted || 0, lastSessionAt: saved.lastSessionAt || null };
      }
      for (const id of Object.keys(fresh.signals)) {
        saved.signals[id] = Array.isArray(saved.signals?.[id]) ? saved.signals[id] : [];
      }
      return { ...fresh, ...saved };
    } catch {
      return fresh;
    }
  }

  _save() {
    storageSet(CUMULATIVE_KEY, JSON.stringify(this.cumulative));
  }
}
