// TENSOR — Cross-POV evidence
//
// Confronta le EVIDENZE di due attraversamenti dello stesso evento, non le
// etichette dei prototipi. Sullo stesso scene_id, per ogni dimensione:
//   divergent  → direzioni opposte. Stessa stanza, informazioni diverse, mosse diverse.
//   convergent → stessa direzione da gesti diversi. Pressioni diverse, stessa strategia.
//
// Il testo nomina: il giorno, i due POV, le due scelte così come sono state
// lette, e ciò che ciascun POV sapeva. Non nomina mai ipocrisia, incoerenza,
// coerenza, giusto o sbagliato. Il gioco registra. Non mette a confronto per
// decidere chi aveva ragione.

const DAY = {
  parco_lunedi: 'Lunedì',
  riunione_mercoledi: 'Mercoledì',
  audit_venerdi: 'Venerdì',
  fermata_domenica: 'Domenica'
};

const POLARITY_LABEL = {
  conformismo: 'seguire il copione',
  autonomia: 'uscire dal copione',
  protezione: 'coprire qualcuno',
  interesse_personale: 'tenere la posizione',
  lealta: 'scegliere la persona',
  giustizia: 'scegliere il principio',
  confronto: 'dire',
  fuga: 'non dire',
  controllo: 'tenere in mano la situazione',
  accettazione: 'lasciarla andare',
  compliance: 'restare dentro le regole',
  reframing: 'cambiare il gioco'
};

// Parole che trasformerebbero un'osservazione in un giudizio. Il test le controlla.
export const FORBIDDEN_IN_REVEAL = ['ipocri', 'incoeren', 'coerent', 'sbagli', 'giusto', 'giusta', 'colpa', 'dovevi', 'avresti dovuto', 'vigliacc', 'coraggio'];

function firstSentence(text) {
  if (!text) return '';
  const clean = text.replace(/["“”«»]/g, '').trim();
  const m = clean.match(/^[^.!?]+[.!?]?/);
  return (m ? m[0] : clean).trim();
}

function characterName(pov) {
  if (!pov) return '?';
  if (typeof pov.character === 'string') return pov.character;
  return pov.character?.name || pov.pov_id || '?';
}

function tokens(s) {
  return new Set(String(s).toLowerCase().match(/[a-zàèéìòù]{3,}/g) || []);
}

function jaccard(a, b) {
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  const union = a.size + b.size - inter;
  return union ? inter / union : 0;
}

// Cosa sapeva un POV che l'altro non sapeva, in questa scena.
// I `knows` sono scritti a mano e lo stesso fatto può avere due formulazioni:
// si sceglie il fatto con la minima sovrapposizione lessicale con tutti i
// fatti noti all'altro. Sopra la soglia è considerato lo stesso fatto.
const SAME_FACT_THRESHOLD = 0.34;
function asymmetricKnowledge(sceneA, sceneB) {
  const othersTokens = (sceneB.knows || []).map(tokens);
  let best = null;
  let bestScore = Infinity;
  for (const k of sceneA.knows || []) {
    const t = tokens(k);
    const score = Math.max(0, ...othersTokens.map(o => jaccard(t, o)));
    if (score < bestScore) { bestScore = score; best = k; }
  }
  return bestScore < SAME_FACT_THRESHOLD ? best : null;
}

function sceneOf(pov, sceneId) {
  return pov?.scenes?.find(s => s.scene_id === sceneId) || null;
}

function choiceOf(scene, entry) {
  const node = scene?.nodes?.[entry.nodeIndex];
  return node?.choices?.find(c => c.key === entry.choiceKey) || null;
}

// Ricostruisce, per un POV e una comparazione, la scelta più pesante
function heaviestChoice(povSide, scene) {
  let best = null;
  for (const e of povSide.entries) {
    if (!best || Math.abs(e.adjusted) > Math.abs(best.adjusted)) best = e;
  }
  return best ? choiceOf(scene, best) : null;
}

// comparisons: output di profiler.compareScene(sceneId)
// Restituisce al massimo una divergenza e una convergenza, in forma di testo osservativo.
// Si sceglie per peso dell'evidenza su tutte le scene, non per ordine di scena.
export function buildCrossPovObservations({ currentPov, otherPovs, comparisonsByScene, getPov }) {
  const out = [];
  const seen = { divergent: false, convergent: false };

  const ranked = Object.entries(comparisonsByScene)
    .flatMap(([sceneId, comparisons]) => comparisons.map(c => ({ ...c, sceneId })))
    .sort((a, b) => b.magnitude - a.magnitude);

  for (const cmp of ranked) {
    const sceneId = cmp.sceneId;
    {
      if (seen[cmp.relation]) continue;
      const mine = cmp.povs.find(p => p.povId === currentPov);
      const other = cmp.povs.find(p => p.povId !== currentPov && otherPovs.includes(p.povId));
      if (!mine || !other) continue;

      const povA = getPov(other.povId);
      const povB = getPov(currentPov);
      const sceneA = sceneOf(povA, sceneId);
      const sceneB = sceneOf(povB, sceneId);
      if (!sceneA || !sceneB) continue;

      const choiceA = heaviestChoice(other, sceneA);
      const choiceB = heaviestChoice(mine, sceneB);
      if (!choiceA || !choiceB) continue;

      const nameA = characterName(povA);
      const nameB = characterName(povB);
      const day = DAY[sceneId] || sceneId;

      if (cmp.relation === 'divergent') {
        const knewA = asymmetricKnowledge(sceneA, sceneB);
        const knewB = asymmetricKnowledge(sceneB, sceneA);
        let text = `${day}. Da ${nameA}: «${firstSentence(choiceA.text)}» Da ${nameB}: «${firstSentence(choiceB.text)}»`;
        // I `knows` sono scritti in seconda persona, dalla testa del personaggio: vanno tra virgolette.
        if (knewA && knewB) {
          text += ` ${nameA} sapeva: «${knewA}». ${nameB} sapeva: «${knewB}».`;
        } else if (knewB) {
          text += ` ${nameB} sapeva una cosa che ${nameA} non sapeva: «${knewB}».`;
        }
        text += ' Stesso giorno. Il gioco tiene tutte e due le mosse. Non le mette una contro l\'altra.';
        out.push(text);
        seen.divergent = true;
      } else {
        const label = POLARITY_LABEL[mine.direction] || mine.direction;
        const text = `${day}. Da ${nameA}: «${firstSentence(choiceA.text)}» Da ${nameB}: «${firstSentence(choiceB.text)}» Due gesti diversi, una direzione sola: ${label}. Pressioni diverse hanno trovato la stessa uscita.`;
        out.push(text);
        seen.convergent = true;
      }
    }
    if (seen.divergent && seen.convergent) break;
  }

  return out;
}
