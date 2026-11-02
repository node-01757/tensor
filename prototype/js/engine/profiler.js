// TENSOR — Silent Profiler v1
//
// Due livelli:
//  - run        → il profilo della singola partita (un POV). Si azzera a ogni run.
//                 Alimenta il reveal di fine storia e le barre dimensionali.
//  - cumulative → il "tensor" del giocatore. Persistente in localStorage,
//                 sopravvive tra run e tra storie. È l'unico stato cross-story.
//
// Regole applicate (TENSOR_schemas_v1.md §2, §5):
//  - ogni segnale è pesato da actually_measures della scena (weight × modulazione RT)
//  - segnali su dimensioni non dichiarate dalla scena → 'incidental', peso INCIDENTAL_WEIGHT
//  - il response time modula, non stabilizza mai da solo
//  - stabilità: min osservazioni, prototipi distinti, domini distinti, max_masked_only_ratio
//  - soglie di confidenza progressiva per numero di sessioni completate
//  - timeout: non è una scelta. Registrato a parte, non sposta i punteggi.

const CUMULATIVE_KEY = 'tensor_profile_v1';
const LEGACY_KEY = 'tensor_profile';

export const PROFILER_CONFIG = {
  fastThresholdMs: 2200,
  slowThresholdMs: 7000,
  fastMultiplier: 1.2,
  slowMultiplier: 0.8,
  incidentalWeight: 0.3,
  recentSignalsPerDimension: 50,
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

function emptyDimension() {
  return {
    score: 0,                 // <0 = polarity_a, >0 = polarity_b (pesato)
    weightedTotal: 0,         // somma dei |contributi|: base per normalizzare
    observations: 0,
    countA: 0,
    countB: 0,
    byMode: { direct: 0, masked: 0, incidental: 0 },
    prototypes: {},           // prototype_id → osservazioni
    domains: {},              // domain → osservazioni
    signals: []               // log recente (run: completo, cumulative: troncato)
  };
}

function emptyProfile(dimensions) {
  const dims = {};
  for (const d of dimensions) dims[d.id] = emptyDimension();
  return { dims, timeouts: [], kobayashi: 0, choices: 0 };
}

function storageGet(key) {
  try {
    return globalThis.localStorage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    globalThis.localStorage?.setItem(key, value);
  } catch {
    // storage pieno o bloccato: il profilo resta in memoria per questa sessione
  }
}

function storageRemove(key) {
  try {
    globalThis.localStorage?.removeItem(key);
  } catch { /* noop */ }
}

export class Profiler {
  constructor(dimensions, config = PROFILER_CONFIG) {
    this.dimensions = dimensions;
    this.dimById = Object.fromEntries(dimensions.map(d => [d.id, d]));
    this.config = config;
    this.run = emptyProfile(dimensions);
    this.cumulative = this._loadCumulative();
    // Il vecchio formato salvava solo il profilo della run e veniva azzerato a ogni POV:
    // non contiene nulla di cumulativo da migrare.
    storageRemove(LEGACY_KEY);
  }

  // Compatibilità: il reveal e le barre leggono profiler.profile[dimId].observations
  get profile() {
    return this.run.dims;
  }

  // ---- Ciclo di vita ----

  startRun() {
    this.run = emptyProfile(this.dimensions);
  }

  completeRun() {
    this.cumulative.sessionsCompleted++;
    this.cumulative.lastSessionAt = Date.now();
    this._save();
  }

  resetAll() {
    this.run = emptyProfile(this.dimensions);
    this.cumulative = this._emptyCumulative();
    this._save();
  }

  // ---- Registrazione ----

  // scene: { scene_id, prototype_id, domain, actually_measures }
  recordChoice({ signals = [], responseTimeMs, scene = {}, kobayashi = false }) {
    const rtModifier = this._rtModifier(responseTimeMs);
    const measures = this._indexMeasures(scene.actually_measures);

    for (const p of [this.run, this.cumulative]) {
      p.choices++;
      if (kobayashi) p.kobayashi++;
    }

    for (const signal of signals) {
      const dimDef = this.dimById[signal.dimension_id];
      if (!dimDef) continue;
      if (signal.direction !== dimDef.polarity_a && signal.direction !== dimDef.polarity_b) continue;

      const declared = measures ? measures[signal.dimension_id] : { measurement_mode: 'direct', weight: 1 };
      const mode = declared ? declared.measurement_mode : 'incidental';
      const weight = declared ? declared.weight : this.config.incidentalWeight;
      const sign = signal.direction === dimDef.polarity_b ? 1 : -1;
      const adjusted = signal.magnitude * weight * rtModifier * sign;

      const entry = {
        direction: signal.direction,
        magnitude: signal.magnitude,
        weight,
        mode: MODES.includes(mode) ? mode : 'incidental',
        rtModifier,
        adjusted,
        responseTimeMs,
        sceneId: scene.scene_id ?? null,
        prototypeId: scene.prototype_id ?? null,
        domain: scene.domain ?? null,
        timestamp: Date.now()
      };

      this._apply(this.run.dims[signal.dimension_id], entry, dimDef, Infinity);
      this._apply(this.cumulative.dims[signal.dimension_id], entry, dimDef, this.config.recentSignalsPerDimension);
    }

    this._save();
  }

  // Il timer è scaduto: la storia prosegue con il default, ma il profilo non attribuisce
  // al giocatore una posizione morale che non ha preso.
  recordTimeout({ scene = {}, nodeIndex = null, defaultKey = null }) {
    const entry = {
      sceneId: scene.scene_id ?? null,
      prototypeId: scene.prototype_id ?? null,
      nodeIndex,
      defaultKey,
      timestamp: Date.now()
    };
    this.run.timeouts.push(entry);
    this.cumulative.timeouts.push(entry);
    if (this.cumulative.timeouts.length > 200) this.cumulative.timeouts.shift();
    this._save();
  }

  // ---- Lettura: run corrente ----

  getProfileSummary() {
    return this._summarize(this.run.dims);
  }

  // 0 = tutto polarity_a, 1 = tutto polarity_b, 0.5 = equilibrio o nessun dato.
  // Normalizzato sul peso totale osservato: misura la direzione, non il volume.
  getNormalizedScore(dimensionId) {
    return this._normalized(this.run.dims[dimensionId]);
  }

  getTotalObservations() {
    return Object.values(this.run.dims).reduce((n, d) => n + d.observations, 0);
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

  getCumulativeSummary() {
    return this._summarize(this.cumulative.dims).map(s => ({
      ...s,
      stability: this._stability(this.cumulative.dims[s.dimensionId])
    }));
  }

  getStableDimensions() {
    return this.getCumulativeSummary().filter(s => s.stability.stable);
  }

  // Contraddizione cumulativa: dimensione stabile in cui entrambi i poli pesano
  // almeno minShare del totale. È un'osservazione, non una diagnosi.
  getContradictions(minShare = 0.3) {
    return this.getStableDimensions().filter(s => {
      const d = this.cumulative.dims[s.dimensionId];
      if (d.weightedTotal === 0) return false;
      const shareB = (d.weightedTotal + d.score) / 2 / d.weightedTotal;
      return shareB >= minShare && 1 - shareB >= minShare;
    });
  }

  // ---- Interni ----

  _apply(dim, entry, dimDef, maxLog) {
    dim.score += entry.adjusted;
    dim.weightedTotal += Math.abs(entry.adjusted);
    dim.observations++;
    if (entry.direction === dimDef.polarity_a) dim.countA++;
    else dim.countB++;
    dim.byMode[entry.mode]++;
    if (entry.prototypeId) dim.prototypes[entry.prototypeId] = (dim.prototypes[entry.prototypeId] || 0) + 1;
    if (entry.domain) dim.domains[entry.domain] = (dim.domains[entry.domain] || 0) + 1;
    dim.signals.push(entry);
    if (dim.signals.length > maxLog) dim.signals.splice(0, dim.signals.length - maxLog);
  }

  _summarize(dims) {
    const summary = [];
    for (const def of this.dimensions) {
      const d = dims[def.id];
      if (!d || d.observations === 0) continue;

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
        strength: Math.abs(d.score),
        normalized: this._normalized(d),
        observations: d.observations,
        countA: d.countA,
        countB: d.countB,
        tendencyCount: towardsA ? d.countA : d.countB,
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
    return { stable: missing.length === 0, missing, prototypes, domains, maskedRatio };
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

  _emptyCumulative() {
    return { version: 1, sessionsCompleted: 0, lastSessionAt: null, ...emptyProfile(this.dimensions) };
  }

  _loadCumulative() {
    const fresh = this._emptyCumulative();
    const raw = storageGet(CUMULATIVE_KEY);
    if (!raw) return fresh;
    try {
      const saved = JSON.parse(raw);
      if (saved.version !== 1) return fresh;
      // Dimensioni aggiunte dopo il salvataggio partono vuote
      for (const id of Object.keys(fresh.dims)) {
        saved.dims[id] = { ...emptyDimension(), ...(saved.dims[id] || {}) };
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
