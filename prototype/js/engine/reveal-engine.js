// TENSOR — Reveal Engine
// Entity-situated observations. Never diagnostic. Never identity labels.
// Cross-POV: after 2+ runs, comparative observations surface

import { REVEAL_TEMPLATES } from '../data/reveal-templates.js';

export class RevealEngine {

  // Generate final reveal for the complete story
  generateStoryReveal(allChoices, profileSummary, storyMatrix, completedRuns = [], currentPov = null) {
    const observations = [];
    const totalChoices = allChoices.length;

    if (totalChoices <= 2) {
      observations.push('Il gioco osserva. Non ha ancora abbastanza per dirti qualcosa di vero.');
      return observations;
    }

    // 1. Entity-situated observations (most powerful)
    const entityObs = this._generateEntityObservations(allChoices, storyMatrix);
    for (const obs of entityObs) {
      observations.push(obs);
    }

    // 2. Dimension-based observations for top dimensions
    const topDims = profileSummary
      .filter(d => d.observations >= 2)
      .slice(0, 2);

    for (const dim of topDims) {
      const templates = REVEAL_TEMPLATES[dim.dimensionId];
      if (!templates) continue;

      const directionTemplates = templates[dim.tendency];
      if (!directionTemplates || directionTemplates.length === 0) continue;

      const template = directionTemplates[Math.floor(Math.random() * directionTemplates.length)];
      const total = dim.observations;
      const count = dim.tendency === dim.polarityA ? dim.countA : dim.countB;
      // Mai inventare frequenze: se il polo dominante (per peso) non ha conteggi, si tace
      if (!count) continue;

      const text = template
        .replace('{count}', count)
        .replace('{total}', total);

      observations.push(text);
    }

    // 3. Contradiction check
    const contradictions = profileSummary.filter(d => d.hasContradiction && d.observations >= 3);
    if (contradictions.length > 0) {
      const dim = contradictions[0];
      const ct = REVEAL_TEMPLATES.contradiction;
      const template = ct[Math.floor(Math.random() * ct.length)];
      const text = template
        .replace('{action_a}', this._actionLabel(dim.dimensionId, dim.polarityA))
        .replace('{action_b}', this._actionLabel(dim.dimensionId, dim.polarityB));
      observations.push(text);
    }

    // 4. Kobayashi observation
    const kobayashiCount = allChoices.filter(c => c.isKobayashi).length;
    if (kobayashiCount > 0) {
      observations.push(
        `Hai rifiutato le opzioni proposte ${kobayashiCount} ${kobayashiCount === 1 ? 'volta' : 'volte'} su ${totalChoices}. Cercavi una strada che non era prevista.`
      );
    }

    // 5. Cross-POV observations (only after 2+ runs)
    const crossObs = this._generateCrossPovObservations(allChoices, completedRuns, currentPov);
    for (const obs of crossObs) {
      observations.push(obs);
    }

    if (observations.length === 0) {
      observations.push('Il gioco osserva. Non ha ancora abbastanza per dirti qualcosa di vero.');
    }

    return observations;
  }

  // Generate observations anchored to specific entities
  _generateEntityObservations(allChoices, matrix) {
    const observations = [];
    if (!matrix || !matrix.entities) return observations;

    const entityChoices = {};
    for (const choice of allChoices) {
      if (!choice.entitiesInvolved) continue;
      for (const entityId of choice.entitiesInvolved) {
        if (!entityChoices[entityId]) entityChoices[entityId] = [];
        entityChoices[entityId].push(choice);
      }
    }

    // Martina — protection patterns
    const martinaChoices = entityChoices['martina'] || [];
    if (martinaChoices.length >= 2) {
      const protectiveFlags = martinaChoices.filter(c =>
        c.narrativeFlags.some(f => ['protezione_attiva', 'intervento_protettivo', 'intervento_minimo'].includes(f))
      );
      if (protectiveFlags.length > martinaChoices.length / 2) {
        observations.push('Quando Martina ti cercava con lo sguardo, ti sei avvicinato. Ogni volta.');
      } else if (protectiveFlags.length === 0) {
        observations.push('Quando Martina ti cercava con lo sguardo, hai scelto di lasciarle spazio. Ogni volta.');
      }
    }

    // Marco — trust/debt patterns
    const marcoChoices = entityChoices['marco'] || [];
    if (marcoChoices.length >= 2) {
      const loyaltyFlags = marcoChoices.filter(c =>
        c.narrativeFlags.some(f => ['copertura_debito', 'scelta_finale_lealta', 'avviso_privato', 'pragmatismo'].includes(f))
      );
      const justiceFlags = marcoChoices.filter(c =>
        c.narrativeFlags.some(f => ['denuncia_formale', 'scelta_finale_giustizia', 'difesa_principio'].includes(f))
      );

      if (loyaltyFlags.length > justiceFlags.length) {
        observations.push('Marco ti ha aiutato tre anni fa. Non lo hai dimenticato. Forse il debito pesa più della regola.');
      } else if (justiceFlags.length > loyaltyFlags.length) {
        observations.push('Marco ti ha aiutato tre anni fa. Non lo hai dimenticato. Ma il principio ha pesato di più.');
      }
    }

    // Presidente — power/submission patterns (Sara POV)
    const presidenteChoices = entityChoices['presidente'] || [];
    if (presidenteChoices.length >= 2) {
      const resistance = presidenteChoices.filter(c =>
        c.narrativeFlags.some(f => ['rifiuto', 'rottura_tentata', 'disobbedienza_parziale', 'decisione_parlare', 'rottura_finale'].includes(f))
      );
      const compliance = presidenteChoices.filter(c =>
        c.narrativeFlags.some(f => ['obbedienza', 'performance_completa', 'eliminazione_prove', 'ciclo_continua'].includes(f))
      );

      if (resistance.length > compliance.length) {
        observations.push('Hai provato a dire no. Ogni volta è costato qualcosa. Ma l\'hai detto.');
      } else if (compliance.length > resistance.length) {
        observations.push('Hai fatto quello che dovevi. Ogni volta. Il prezzo lo conosci. Lo paghi in silenzio.');
      } else if (resistance.length > 0 && compliance.length > 0) {
        observations.push('A volte hai resistito. A volte hai obbedito. Non è incoerenza. È sopravvivenza.');
      }
    }

    // Cross-entity: Martina vs strangers
    const strangerChoices = entityChoices['ragazzo_monete'] || [];
    if (martinaChoices.length > 0 && strangerChoices.length > 0) {
      const protectedMartina = martinaChoices.some(c =>
        c.narrativeFlags.some(f => ['protezione_attiva', 'intervento_protettivo', 'intervento_minimo'].includes(f))
      );
      const helpedStranger = strangerChoices.some(c =>
        c.narrativeFlags.some(f => ['intervento_minimo'].includes(f))
      );

      if (protectedMartina && !helpedStranger) {
        observations.push('Proteggi chi conosci. Gli sconosciuti non entrano nel tuo raggio.');
      } else if (protectedMartina && helpedStranger) {
        observations.push('Ti sei avvicinato sia a Martina che al ragazzo alla fermata. Il tuo raggio non ha confini dichiarati.');
      } else if (!protectedMartina && helpedStranger) {
        observations.push('Hai lasciato spazio a Martina. Ma al ragazzo alla fermata ti sei avvicinato. Forse proteggere uno sconosciuto è più semplice.');
      }
    }

    return observations;
  }

  // Cross-POV observations: surface when player has completed 2+ runs
  _generateCrossPovObservations(currentChoices, completedRuns, currentPov) {
    const observations = [];

    // Need at least one previous run from a different POV
    const otherRuns = completedRuns.filter(r => r.povId !== currentPov);
    if (otherRuns.length === 0) return observations;

    const previousRun = otherRuns[otherRuns.length - 1];

    // Compare loyalty/justice tendencies across POVs
    const loyaltyFlags = ['copertura_debito', 'scelta_finale_lealta', 'avviso_privato', 'pragmatismo', 'lealta_debito', 'firma_revisione', 'firma_silenzio', 'sopravvivenza_pura'];
    const justiceFlags = ['denuncia_formale', 'scelta_finale_giustizia', 'difesa_principio', 'segnalazione_anomalia', 'nota_luca_inoltrata', 'ciclo_spezzato'];

    const currentLoyalty = currentChoices.filter(c =>
      c.narrativeFlags.some(f => loyaltyFlags.includes(f))
    ).length;
    const currentJustice = currentChoices.filter(c =>
      c.narrativeFlags.some(f => justiceFlags.includes(f))
    ).length;

    const prevLoyalty = (previousRun.choices || []).filter(c =>
      c.narrativeFlags.some(f => loyaltyFlags.includes(f))
    ).length;
    const prevJustice = (previousRun.choices || []).filter(c =>
      c.narrativeFlags.some(f => justiceFlags.includes(f))
    ).length;

    const prevTendency = prevLoyalty > prevJustice ? 'loyalty' : prevJustice > prevLoyalty ? 'justice' : 'balanced';
    const currTendency = currentLoyalty > currentJustice ? 'loyalty' : currentJustice > currentLoyalty ? 'justice' : 'balanced';

    if (prevTendency !== currTendency && prevTendency !== 'balanced' && currTendency !== 'balanced') {
      observations.push('Hai cambiato idea. Sapere il perché ha cambiato il peso del cosa.');
    } else if (prevTendency === currTendency && prevTendency !== 'balanced') {
      observations.push('Hai scelto la stessa direzione, anche vedendo l\'altra faccia. La coerenza non è sempre certezza.');
    }

    // Reveal dependencies from story matrix
    this._generateRevealDependencyObservations(observations, completedRuns, currentPov);

    // POV-specific cross observations
    if (currentPov === 'marco' && otherRuns.some(r => r.povId === 'enrico')) {
      observations.push('Hai vissuto la stessa settimana da due lati della scrivania. I fatti non sono cambiati. Il significato sì.');
    } else if (currentPov === 'enrico' && otherRuns.some(r => r.povId === 'marco')) {
      observations.push('Ora conosci entrambi i lati. Ma il giudizio resta uno solo — il tuo.');
    }

    // Sara-specific reveals — the gut punch
    if (currentPov === 'sara') {
      if (otherRuns.some(r => r.povId === 'enrico')) {
        observations.push('Ora sai chi ha mandato quella mail. E sai perché non l\'ha mai aperta.');
      }
      observations.push('Adesso sai perché le monete erano per terra. Adesso sai chi è il ragazzo. I fatti non sono cambiati. Ma non riesci più a vederli come prima.');
    }

    // After Sara, playing others hits different
    if (currentPov !== 'sara' && otherRuns.some(r => r.povId === 'sara')) {
      observations.push('C\'era qualcuno che non hai mai visto. Eppure era in ogni scena.');
    }

    // Sara's cycle observation
    if (currentPov === 'sara') {
      const perpetuated = currentChoices.some(c =>
        c.narrativeFlags.some(f => ['ricatto_enrico', 'ciclo_perpetuato', 'diventare_presidente'].includes(f))
      );
      const broken = currentChoices.some(c =>
        c.narrativeFlags.some(f => ['nota_luca_inoltrata', 'ciclo_spezzato', 'sacrificio'].includes(f))
      );

      if (perpetuated) {
        observations.push('Hai usato la stessa arma che è stata usata su di te. Il ciclo non si è rotto. Si è allargato.');
      } else if (broken) {
        observations.push('Hai pagato il prezzo. Qualcun altro avrà il merito. Il ciclo si è spezzato. Non indolore. Ma spezzato.');
      }
    }

    return observations;
  }

  // Use reveal_dependencies from the matrix to generate recontextualization observations
  _generateRevealDependencyObservations(observations, completedRuns, currentPov) {
    // This will be driven by story_matrix.reveal_dependencies when the engine loads them
    // For now the cross-POV observations above cover the v1 cases
  }

  // Fallback for scene-level reveal
  generateSceneReveal(sceneChoices, profileSummary) {
    return this.generateStoryReveal(sceneChoices, profileSummary, null);
  }

  _actionLabel(dimensionId, polarity) {
    const labels = {
      conformismo: 'seguire il gruppo',
      autonomia: 'agire in modo indipendente',
      protezione: 'proteggere qualcuno',
      interesse_personale: 'preservare il tuo spazio',
      lealta: 'scegliere la persona',
      giustizia: 'scegliere il principio',
      confronto: 'affrontare il conflitto',
      fuga: 'evitare il confronto',
      controllo: 'gestire la situazione',
      accettazione: 'lasciare andare',
      compliance: 'operare dentro le regole',
      reframing: 'cambiare le regole'
    };
    return labels[polarity] || polarity;
  }
}
