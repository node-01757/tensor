// TENSOR — Scene Router
// Loads the correct POV data based on character selection
// The old linear STORY export is replaced by a dynamic loader

import { POV_ENRICO } from './pov-enrico.js';
import { POV_MARCO } from './pov-marco.js';
import { POV_SARA } from './pov-sara.js';
import { STORY_MATRIX } from './story-matrix.js';

const POV_MAP = {
  enrico: POV_ENRICO,
  marco: POV_MARCO,
  sara: POV_SARA
};

export function getPov(povId) {
  return POV_MAP[povId] || null;
}

export function getAllPovs() {
  // Return POVs ordered by gravity (design intent, not enforcement)
  const order = STORY_MATRIX.pov_order?.povs || [];
  const ordered = [];
  for (const entry of order) {
    if (POV_MAP[entry.pov_id]) {
      ordered.push(POV_MAP[entry.pov_id]);
    }
  }
  // Append any POVs not in the gravity list
  for (const pov of Object.values(POV_MAP)) {
    if (!ordered.includes(pov)) {
      ordered.push(pov);
    }
  }
  return ordered;
}

// Build a STORY-compatible structure from a POV
// This adapts the POV format to the chapter-based format the engine expects
export function buildStoryFromPov(pov) {
  return {
    id: `settimana_${pov.pov_id}`,
    title: `La settimana`,
    pov_id: pov.pov_id,
    character: pov.character,

    chapters: pov.scenes.map((scene, i) => ({
      chapter: i + 1,
      title: scene.scene_id === 'parco_lunedi' ? 'Lunedì' :
             scene.scene_id === 'riunione_mercoledi' ? 'Mercoledì' :
             scene.scene_id === 'audit_venerdi' ? 'Venerdì' :
             scene.scene_id === 'fermata_domenica' ? 'Domenica' : `Scena ${i + 1}`,
      subtitle: scene.scene_id === 'parco_lunedi' ? 'Il parco' :
                scene.scene_id === 'riunione_mercoledi' ? 'La riunione' :
                scene.scene_id === 'audit_venerdi' ? 'I numeri' :
                scene.scene_id === 'fermata_domenica' ? 'La fermata' : '',
      scene_id: scene.scene_id,
      pov_id: pov.pov_id,
      knows: scene.knows || [],
      doesnt_know: scene.doesnt_know || [],
      prototype_id: scene.prototype_activated,
      domain: scene.domain,
      actually_measures: scene.actually_measures || [],
      entities_present: [], // derived from node choices
      nodes: scene.nodes,
      chapter_end_text: scene.scene_end_text || ''
    }))
  };
}
