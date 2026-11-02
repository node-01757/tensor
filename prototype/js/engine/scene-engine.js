// TENSOR — Scene Engine
// Multi-POV flow: title → POV select → chapters → nodes → choices → reveal
// Cross-run: previous run's flags seed contextual variations in next run

import { Timer } from './timer.js';
import { Profiler } from './profiler.js';
import { TokenManager } from './token-manager.js';
import { GhostEvents } from './ghost-events.js';
import { RevealEngine } from './reveal-engine.js';
import { FlagEngine } from './flag-engine.js';
import { DIMENSIONS } from '../data/dimensions.js';
import { getPov, getAllPovs, buildStoryFromPov } from '../data/scenes.js';
import { STORY_MATRIX } from '../data/story-matrix.js';
import { ScreenManager } from '../ui/screens.js';
import { Typewriter } from '../ui/typewriter.js';

const STORAGE_KEY_STATE = 'tensor_state';
const STORAGE_KEY_RUNS = 'tensor_runs';

export class SceneEngine {
  constructor() {
    this.screens = new ScreenManager();
    this.typewriter = new Typewriter();
    this.timer = new Timer();
    this.profiler = new Profiler(DIMENSIONS);
    this.tokens = new TokenManager();
    this.ghosts = new GhostEvents();
    this.reveal = new RevealEngine();
    this.flags = new FlagEngine(STORY_MATRIX);

    this.state = this._loadState();
    this.completedRuns = this._loadRuns();

    // Runtime
    this.story = null;
    this.currentChapterIndex = 0;
    this.currentNodeIndex = 0;
    this.allChoices = [];

    this._bindEvents();
  }

  _loadState() {
    const saved = localStorage.getItem(STORAGE_KEY_STATE);
    if (saved) return JSON.parse(saved);
    return {
      currentPov: null,
      currentChapterIndex: 0,
      sessionChoices: [],
      storyCompleted: false
    };
  }

  _saveState() {
    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(this.state));
  }

  _loadRuns() {
    const saved = localStorage.getItem(STORAGE_KEY_RUNS);
    if (saved) return JSON.parse(saved);
    return [];
  }

  _saveRuns() {
    localStorage.setItem(STORAGE_KEY_RUNS, JSON.stringify(this.completedRuns));
  }

  _bindEvents() {
    document.getElementById('btn-start').addEventListener('click', () => {
      this.showPovSelect();
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
      this.showPovSelect();
    });

    // Click to skip typewriter
    document.getElementById('narrative-area').addEventListener('click', () => {
      this.typewriter.skip();
    });
  }

  // ---- POV Selection ----

  showPovSelect() {
    const allPovs = getAllPovs();
    const completedPovIds = this.completedRuns.map(r => r.povId);

    this.screens.showScreen('pov');
    this.screens.renderPovCards(allPovs, completedPovIds, (povId) => {
      this.selectPov(povId);
    });
  }

  selectPov(povId) {
    const pov = getPov(povId);
    if (!pov) return;

    this.story = buildStoryFromPov(pov);

    // Reset run state
    this.currentChapterIndex = 0;
    this.currentNodeIndex = 0;
    this.allChoices = [];
    this.profiler.startRun(); // solo la run: il profilo cumulativo persiste
    this.tokens.reset();
    this.flags.reset();

    // Seed flags from previous runs (cross-run propagation)
    this._seedCrossRunFlags(povId);

    this.state = {
      currentPov: povId,
      currentChapterIndex: 0,
      sessionChoices: [],
      storyCompleted: false
    };
    this._saveState();

    this.startChapter();
  }

  // Seed active flags from completed runs into the flag engine
  _seedCrossRunFlags(currentPovId) {
    for (const run of this.completedRuns) {
      if (run.povId === currentPovId) continue; // Don't seed from same POV
      if (!run.activeFlags) continue;

      for (const [flagId, flagData] of Object.entries(run.activeFlags)) {
        // Only seed active-class flags across runs
        if (flagData.memory_class === 'active') {
          this.flags.state.active_flags[flagId] = { ...flagData };
        }
      }
    }
  }

  // ---- Chapter Flow ----

  async startChapter() {
    const chapter = this.story.chapters[this.currentChapterIndex];
    if (!chapter) {
      this.showFinalReveal();
      return;
    }

    this.currentNodeIndex = 0;

    // Enter chapter in flag engine
    this.flags.enterChapter(chapter.chapter);
    this.flags.processSceneEntry(chapter.chapter);

    // Show chapter transition
    this.screens.showScreen('play');
    this.screens.setSceneTitle(`${chapter.title}`);
    this.screens.setSceneSubtitle(chapter.subtitle);
    this.timer.hide();

    const narrativeArea = this.screens.getNarrativeArea();
    narrativeArea.innerHTML = '';

    // Chapter title card
    await this.screens.showChapterCard(chapter.title, chapter.subtitle);

    this.presentNode();
  }

  async presentNode() {
    const chapter = this.story.chapters[this.currentChapterIndex];
    const node = chapter.nodes[this.currentNodeIndex];
    if (!node) {
      this.showChapterEnd();
      return;
    }

    const narrativeArea = this.screens.getNarrativeArea();
    narrativeArea.innerHTML = '';
    this.screens.hideChoices();
    this.timer.hide();

    // Build setup text with contextual variation
    let setupText = node.setup_text;

    // Inject variation if this is the first node of the chapter
    if (this.currentNodeIndex === 0) {
      const variation = this.flags.getVariation(chapter.chapter);
      if (variation) {
        const varText = variation.activated ? variation.text_override : variation.fallback;
        if (variation.insert_after_setup) {
          setupText = setupText + varText;
        } else {
          setupText = setupText + '\n\n' + varText;
        }
      }
    }

    // Typewrite setup
    await this.typewriter.type(narrativeArea, setupText);
    await this._delay(800);

    // Deep copy choices
    const choices = node.choices.map(c => ({ ...c, _unlocked: false }));

    // Render choices
    this.screens.renderChoices(
      choices,
      this.tokens.canSpend(1),
      (key) => this.handleChoice(key, chapter, node, choices),
      (choice) => this.unlockKobayashi(choice, chapter, node, choices)
    );

    // Start timer
    this.timer.start(node.timer_seconds || 12, () => {
      this.handleTimeout(chapter, node, choices);
    });
  }

  handleChoice(key, chapter, node, choices) {
    const responseTimeMs = this.timer.stop();
    this.timer.hide();
    this.screens.highlightChoice(key, false);

    const chosen = choices.find(c => c.key === key);
    if (!chosen) return;

    // Record profile signals, pesati da actually_measures della scena
    this.profiler.recordChoice({
      signals: chosen.effects?.profile_signals || [],
      responseTimeMs,
      scene: this._sceneMeta(chapter),
      kobayashi: !!chosen.kobayashi
    });

    // Process flags
    this.flags.processChoice(chapter.chapter, `cap0${chapter.chapter}`, key);

    // Store choice
    const choiceRecord = {
      chapter: chapter.chapter,
      chapterTitle: chapter.title,
      nodeIndex: this.currentNodeIndex,
      choiceKey: key,
      responseTimeMs,
      timedOut: false,
      isKobayashi: chosen.kobayashi || false,
      narrativeFlags: chosen.narrative_flags || [],
      entitiesInvolved: chosen.entities_involved || [],
      timestamp: Date.now()
    };
    this.allChoices.push(choiceRecord);
    this.state.sessionChoices = this.allChoices;
    this._saveState();

    setTimeout(() => this.showContinuation(node, key), 600);
  }

  handleTimeout(chapter, node, choices) {
    const defaultKey = 'B';
    this.timer.hide();
    this.screens.highlightChoice(defaultKey, true);
    this.screens.showTimeoutText();

    const chosen = choices.find(c => c.key === defaultKey);
    // Il timeout non è una scelta: la storia prosegue con il default,
    // ma il profilo non attribuisce i segnali di quella opzione.
    this.profiler.recordTimeout({
      scene: this._sceneMeta(chapter),
      nodeIndex: this.currentNodeIndex,
      defaultKey
    });

    this.flags.processChoice(chapter.chapter, `cap0${chapter.chapter}`, defaultKey);

    const choiceRecord = {
      chapter: chapter.chapter,
      chapterTitle: chapter.title,
      nodeIndex: this.currentNodeIndex,
      choiceKey: defaultKey,
      responseTimeMs: (node.timer_seconds || 12) * 1000,
      timedOut: true,
      isKobayashi: false,
      narrativeFlags: chosen?.narrative_flags || [],
      entitiesInvolved: chosen?.entities_involved || [],
      timestamp: Date.now()
    };
    this.allChoices.push(choiceRecord);
    this.state.sessionChoices = this.allChoices;
    this._saveState();

    setTimeout(() => this.showContinuation(node, defaultKey), 1500);
  }

  unlockKobayashi(choice, chapter, node, choices) {
    if (!this.tokens.canSpend(choice.token_cost || 1)) return;
    this.tokens.spend(choice.token_cost || 1);
    choice._unlocked = true;

    this.screens.renderChoices(
      choices,
      this.tokens.canSpend(1),
      (key) => this.handleChoice(key, chapter, node, choices),
      (c) => this.unlockKobayashi(c, chapter, node, choices)
    );
  }

  async showContinuation(node, choiceKey) {
    const continuationText = node.continuations[choiceKey];
    if (!continuationText) {
      this.advanceNode();
      return;
    }

    const narrativeArea = this.screens.getNarrativeArea();
    narrativeArea.innerHTML = '';
    this.screens.hideChoices();

    await this.typewriter.type(narrativeArea, continuationText);

    // Ghost event
    const ghostText = this.ghosts.getGhostStat(node, choiceKey);
    this.screens.showGhostEvent(ghostText);

    await this._delay(3500);
    this.advanceNode();
  }

  advanceNode() {
    this.currentNodeIndex++;
    const chapter = this.story.chapters[this.currentChapterIndex];
    if (this.currentNodeIndex < chapter.nodes.length) {
      this.presentNode();
    } else {
      this.showChapterEnd();
    }
  }

  async showChapterEnd() {
    const chapter = this.story.chapters[this.currentChapterIndex];
    this.timer.hide();
    this.screens.hideChoices();

    const narrativeArea = this.screens.getNarrativeArea();
    narrativeArea.innerHTML = '';

    if (chapter.chapter_end_text) {
      await this.typewriter.type(narrativeArea, chapter.chapter_end_text, 35);
      await this._delay(3000);
    } else {
      await this._delay(1500);
    }

    // Advance to next chapter
    this.currentChapterIndex++;
    this.state.currentChapterIndex = this.currentChapterIndex;
    this._saveState();

    if (this.currentChapterIndex < this.story.chapters.length) {
      this.startChapter();
    } else {
      this.showFinalReveal();
    }
  }

  // ---- Final Reveal ----

  showFinalReveal() {
    this.state.storyCompleted = true;
    this._saveState();

    // Save completed run for cross-run propagation
    this._saveCompletedRun();
    this.profiler.completeRun();

    const profileSummary = this.profiler.getProfileSummary();
    const observations = this.reveal.generateStoryReveal(
      this.allChoices, profileSummary, STORY_MATRIX, this.completedRuns, this.state.currentPov
    );

    // Build dimension bars
    const dimensionData = DIMENSIONS
      .filter(d => {
        const data = this.profiler.profile[d.id];
        return data && data.observations > 0;
      })
      .map(d => ({
        labelA: d.label_a,
        labelB: d.label_b,
        normalized: this.profiler.getNormalizedScore(d.id)
      }));

    this.screens.showScreen('summary');
    this.screens.renderSummary(observations, dimensionData);
  }

  _saveCompletedRun() {
    const run = {
      povId: this.state.currentPov,
      choices: [...this.allChoices],
      activeFlags: { ...this.flags.state.active_flags },
      profileSummary: this.profiler.getProfileSummary(),
      timestamp: Date.now()
    };

    // Replace if same POV was already completed (replay)
    this.completedRuns = this.completedRuns.filter(r => r.povId !== run.povId);
    this.completedRuns.push(run);
    this._saveRuns();
  }

  // ---- Reset ----

  resetSession() {
    // Full reset — clears cross-run data too
    this.state = { currentPov: null, currentChapterIndex: 0, sessionChoices: [], storyCompleted: false };
    this._saveState();
    this.completedRuns = [];
    this._saveRuns();
    this.profiler.resetAll();
    this.tokens.reset();
    this.flags.reset();
    this.story = null;
    this.currentChapterIndex = 0;
    this.currentNodeIndex = 0;
    this.allChoices = [];
    this.screens.showScreen('title');
  }

  _sceneMeta(chapter) {
    return {
      scene_id: chapter.scene_id,
      prototype_id: chapter.prototype_id,
      domain: chapter.domain,
      actually_measures: chapter.actually_measures
    };
  }

  _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
