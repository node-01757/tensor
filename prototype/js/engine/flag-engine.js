// TENSOR — Flag Engine
// Manages narrative flags with memory_class hierarchy
// active: survives entire story
// passive: survives +1 chapter
// ambient: dies in current chapter
//
// Variation priority: memory_class (active > passive > ambient), then distance (farther wins)
// Max 1 variation per chapter — blindato in v1.

const STORAGE_KEY = 'tensor_flags';

const MEMORY_CLASS_PRIORITY = { active: 3, passive: 2, ambient: 1 };

export class FlagEngine {
  constructor(storyMatrix) {
    this.matrix = storyMatrix;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      this.state = JSON.parse(saved);
    } else {
      this.state = {
        active_flags: {},   // flag_id -> { memory_class, source_chapter, scene_id }
        current_chapter: 0
      };
    }
  }

  // Called when a chapter starts — prunes expired flags
  enterChapter(chapterNum) {
    this.state.current_chapter = chapterNum;
    this._pruneFlags(chapterNum);
    this._save();
  }

  // Called when a choice is made in a specific scene
  processChoice(chapterNum, sceneId, choiceKey) {
    for (const source of this.matrix.flag_sources) {
      // Match by scene_id prefix (source_scene_id matches start of sceneId)
      const matchesScene = this._matchesScene(source.source_scene_id, chapterNum);

      if (!matchesScene) continue;

      // Check dependency
      if (source.requires_flag && !this.hasFlag(source.requires_flag)) continue;

      // Active/passive with specific choice key
      if (source.source_choice_key) {
        if (source.source_choice_key === choiceKey) {
          this._setFlag(source.flag_id, source.memory_class, chapterNum, source.source_scene_id);
        }
      }
      // Passive/ambient without choice key (scene presence)
      else if (!source.source_choice_key) {
        if (source.memory_class === 'passive' || source.memory_class === 'ambient') {
          this._setFlag(source.flag_id, source.memory_class, chapterNum, source.source_scene_id);
        }
      }
    }
    this._save();
  }

  // Activate passive no-choice flags on scene entry
  processSceneEntry(chapterNum) {
    for (const source of this.matrix.flag_sources) {
      if (!this._matchesScene(source.source_scene_id, chapterNum)) continue;
      if (source.source_choice_key === null || source.source_choice_key === undefined) {
        if (!source.requires_flag || this.hasFlag(source.requires_flag)) {
          this._setFlag(source.flag_id, source.memory_class, chapterNum, source.source_scene_id);
        }
      }
    }
    this._save();
  }

  hasFlag(flagId) {
    return flagId in this.state.active_flags;
  }

  // Get the single best contextual variation for this chapter
  // Follows variation_priority_policy: memory_class first, then distance
  getVariation(chapterNum) {
    const candidates = this.matrix.contextual_variations
      .filter(v => v.chapter === chapterNum);

    if (candidates.length === 0) return null;

    let bestVariation = null;
    let bestScore = -1;

    for (const variation of candidates) {
      if (!this.hasFlag(variation.trigger_flag)) continue;

      const flagData = this.state.active_flags[variation.trigger_flag];
      const classPriority = MEMORY_CLASS_PRIORITY[flagData.memory_class] || 0;
      const distance = chapterNum - flagData.source_chapter;

      // Score: class priority * 100 + distance (class dominates, distance breaks ties)
      const score = classPriority * 100 + distance;

      if (score > bestScore) {
        bestScore = score;
        bestVariation = { ...variation, activated: true };
      }
    }

    // If no flag matched, return first candidate with fallback
    if (!bestVariation) {
      bestVariation = { ...candidates[0], activated: false };
    }

    return bestVariation;
  }

  _matchesScene(sourceSceneId, chapterNum) {
    // Match by chapter number extracted from scene_id prefix (cap01, cap02, etc.)
    const match = sourceSceneId.match(/cap0?(\d+)/);
    if (match) {
      return parseInt(match[1], 10) === chapterNum;
    }
    return false;
  }

  _setFlag(flagId, memoryClass, chapter, sceneId) {
    this.state.active_flags[flagId] = {
      memory_class: memoryClass,
      source_chapter: chapter,
      scene_id: sceneId
    };
  }

  _pruneFlags(currentChapter) {
    const policy = this.matrix.flag_rules.distant_recall_policy;
    const toRemove = [];

    for (const [flagId, data] of Object.entries(this.state.active_flags)) {
      const distance = currentChapter - data.source_chapter;

      if (data.memory_class === 'ambient' && distance > policy.max_distance_for_ambient) {
        toRemove.push(flagId);
      }
      if (data.memory_class === 'passive' && distance > policy.max_distance_for_passive) {
        toRemove.push(flagId);
      }
      // active: no pruning
    }

    for (const flagId of toRemove) {
      delete this.state.active_flags[flagId];
    }
  }

  reset() {
    this.state = { active_flags: {}, current_chapter: 0 };
    this._save();
  }

  _save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  }
}
