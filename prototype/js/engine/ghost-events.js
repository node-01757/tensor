// TENSOR — Ghost Events
// Simulated aggregate stats with slight randomization

export class GhostEvents {
  getGhostStat(node, choiceKey) {
    if (!node.ghost_event || !node.ghost_event[choiceKey]) {
      return this._generateGeneric(choiceKey);
    }
    return this._addVariation(node.ghost_event[choiceKey]);
  }

  _addVariation(text) {
    // Add +/- 3% variation to any percentage in the text
    return text.replace(/(\d+)%/g, (match, num) => {
      const base = parseInt(num, 10);
      const variation = Math.floor(Math.random() * 7) - 3;
      const result = Math.max(1, Math.min(99, base + variation));
      return `${result}%`;
    });
  }

  _generateGeneric(choiceKey) {
    const templates = [
      'Qualcuno prima di te ha fatto la stessa scelta.',
      'Non sei il primo a scegliere così.',
      'Il gioco ricorda chi è passato prima di te.'
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }
}
