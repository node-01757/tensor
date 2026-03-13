// TENSOR — Silent Profiler
// Tracks dimensions, applies response time modulation, generates summaries

const STORAGE_KEY = 'tensor_profile';
const FAST_THRESHOLD_MS = 2200;
const SLOW_THRESHOLD_MS = 7000;
const FAST_MULTIPLIER = 1.2;
const SLOW_MULTIPLIER = 0.8;

export class Profiler {
  constructor(dimensions) {
    this.dimensions = dimensions;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      this.profile = JSON.parse(saved);
    } else {
      this.profile = {};
      for (const dim of dimensions) {
        this.profile[dim.id] = {
          score: 0,          // negative = polarity_a, positive = polarity_b
          observations: 0,
          signals: []        // raw signal log for reveal engine
        };
      }
    }
  }

  recordSignals(profileSignals, responseTimeMs) {
    // Calculate response time modifier
    let rtModifier = 1.0;
    if (responseTimeMs < FAST_THRESHOLD_MS) {
      rtModifier = FAST_MULTIPLIER;
    } else if (responseTimeMs > SLOW_THRESHOLD_MS) {
      rtModifier = SLOW_MULTIPLIER;
    }

    for (const signal of profileSignals) {
      const dim = this.profile[signal.dimension_id];
      if (!dim) continue;

      // Find dimension definition to know polarity mapping
      const dimDef = this.dimensions.find(d => d.id === signal.dimension_id);
      if (!dimDef) continue;

      // Direction determines sign: polarity_a = negative, polarity_b = positive
      const sign = signal.direction === dimDef.polarity_b ? 1 : -1;
      const adjustedMagnitude = signal.magnitude * rtModifier * sign;

      dim.score += adjustedMagnitude;
      dim.observations++;
      dim.signals.push({
        direction: signal.direction,
        magnitude: signal.magnitude,
        adjusted: adjustedMagnitude,
        responseTimeMs,
        timestamp: Date.now()
      });
    }

    this._save();
  }

  getProfileSummary() {
    const summary = [];
    for (const dim of this.dimensions) {
      const data = this.profile[dim.id];
      if (!data || data.observations === 0) continue;

      // Determine dominant tendency
      let tendency, strength;
      if (data.score < 0) {
        tendency = dim.polarity_a;
        strength = Math.abs(data.score);
      } else {
        tendency = dim.polarity_b;
        strength = data.score;
      }

      // Count signals per direction
      const countA = data.signals.filter(s => s.direction === dim.polarity_a).length;
      const countB = data.signals.filter(s => s.direction === dim.polarity_b).length;

      summary.push({
        dimensionId: dim.id,
        label: dim.label,
        tendency,
        oppositePolarity: tendency === dim.polarity_a ? dim.polarity_b : dim.polarity_a,
        strength,
        observations: data.observations,
        score: data.score,
        countA,
        countB,
        labelA: dim.label_a,
        labelB: dim.label_b,
        hasContradiction: countA > 0 && countB > 0
      });
    }

    return summary.sort((a, b) => b.observations - a.observations);
  }

  // Normalized score for dimension bar display: 0 = full polarity_a, 1 = full polarity_b
  getNormalizedScore(dimensionId) {
    const data = this.profile[dimensionId];
    if (!data || data.observations === 0) return 0.5;
    // Clamp to [-10, 10] range, then normalize to [0, 1]
    const clamped = Math.max(-10, Math.min(10, data.score));
    return (clamped + 10) / 20;
  }

  getTotalObservations() {
    let total = 0;
    for (const dim of this.dimensions) {
      total += (this.profile[dim.id]?.observations || 0);
    }
    return total;
  }

  reset() {
    for (const dim of this.dimensions) {
      this.profile[dim.id] = { score: 0, observations: 0, signals: [] };
    }
    this._save();
  }

  _save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.profile));
  }
}
