// TENSOR — Token Manager
// Manages Kobayashi token economy

const INITIAL_TOKENS = 3;
const STORAGE_KEY = 'tensor_tokens';

export class TokenManager {
  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    this.balance = saved !== null ? parseInt(saved, 10) : INITIAL_TOKENS;
    this._updateDisplay();
  }

  getBalance() {
    return this.balance;
  }

  canSpend(cost = 1) {
    return this.balance >= cost;
  }

  spend(cost = 1) {
    if (!this.canSpend(cost)) return false;
    this.balance -= cost;
    this._save();
    this._updateDisplay();
    return true;
  }

  reset() {
    this.balance = INITIAL_TOKENS;
    this._save();
    this._updateDisplay();
  }

  _save() {
    localStorage.setItem(STORAGE_KEY, this.balance.toString());
  }

  _updateDisplay() {
    const el = document.getElementById('token-count');
    if (el) el.textContent = this.balance;
  }
}
