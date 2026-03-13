// TENSOR — Typewriter Effect
// Character-by-character text animation with skip support

export class Typewriter {
  constructor() {
    this._skipRequested = false;
    this._currentResolve = null;
  }

  async type(element, text, speed = 28) {
    this._skipRequested = false;
    element.innerHTML = '';

    const cursor = document.createElement('span');
    cursor.className = 'cursor';

    return new Promise((resolve) => {
      this._currentResolve = resolve;
      let i = 0;

      const textNode = document.createTextNode('');
      element.appendChild(textNode);
      element.appendChild(cursor);

      const advance = () => {
        if (this._skipRequested || i >= text.length) {
          textNode.textContent = text;
          cursor.remove();
          this._currentResolve = null;
          resolve();
          return;
        }

        textNode.textContent = text.substring(0, i + 1);
        i++;
        setTimeout(advance, speed);
      };

      advance();
    });
  }

  skip() {
    this._skipRequested = true;
  }
}
