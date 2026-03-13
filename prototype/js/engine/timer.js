// TENSOR — Timer Engine
// SVG ring countdown with phase colors and response time capture

const CIRCUMFERENCE = 2 * Math.PI * 52; // r=52

export class Timer {
  constructor() {
    this.ring = document.getElementById('timer-ring-progress');
    this.text = document.getElementById('timer-text');
    this.container = document.getElementById('timer-container');
    this.running = false;
    this.startTime = null;
    this.duration = 0;
    this.rafId = null;
    this.onExpire = null;
  }

  start(seconds, onExpire) {
    this.duration = seconds * 1000;
    this.startTime = performance.now();
    this.running = true;
    this.onExpire = onExpire;

    this.ring.style.strokeDasharray = CIRCUMFERENCE;
    this.ring.style.strokeDashoffset = '0';
    this.ring.classList.remove('warn', 'danger');
    this.container.classList.remove('hidden');

    this._tick();
  }

  _tick() {
    if (!this.running) return;

    const elapsed = performance.now() - this.startTime;
    const remaining = Math.max(0, this.duration - elapsed);
    const remainingSec = Math.ceil(remaining / 1000);
    const fraction = remaining / this.duration;

    // Update ring
    const offset = CIRCUMFERENCE * (1 - fraction);
    this.ring.style.strokeDashoffset = offset;

    // Update text
    this.text.textContent = remainingSec;

    // Phase colors
    this.ring.classList.remove('warn', 'danger');
    if (remainingSec <= 3) {
      this.ring.classList.add('danger');
    } else if (remainingSec <= 7) {
      this.ring.classList.add('warn');
    }

    if (remaining <= 0) {
      this.running = false;
      this.text.textContent = '0';
      if (this.onExpire) this.onExpire();
      return;
    }

    this.rafId = requestAnimationFrame(() => this._tick());
  }

  stop() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    const elapsed = performance.now() - this.startTime;
    return Math.round(elapsed);
  }

  hide() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.container.classList.add('hidden');
  }

  getRemainingMs() {
    if (!this.running) return 0;
    return Math.max(0, this.duration - (performance.now() - this.startTime));
  }
}
