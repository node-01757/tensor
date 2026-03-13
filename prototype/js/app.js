// TENSOR — App Entry Point
// Multi-POV narrative: same week, different eyes

import { SceneEngine } from './engine/scene-engine.js';

document.addEventListener('DOMContentLoaded', () => {
  // Clear current run state (but preserve cross-run data: tensor_runs)
  localStorage.removeItem('tensor_state');
  localStorage.removeItem('tensor_flags');
  localStorage.removeItem('tensor_profile');
  localStorage.removeItem('tensor_tokens');

  window.tensorEngine = new SceneEngine();
});
