// TENSOR — Screen Manager
// Multi-POV flow: title → pov select → play → summary

export class ScreenManager {
  constructor() {
    this.screens = {
      title: document.getElementById('screen-title'),
      pov: document.getElementById('screen-pov'),
      play: document.getElementById('screen-play'),
      summary: document.getElementById('screen-summary')
    };
    this.header = document.getElementById('game-header');
  }

  showScreen(screenId) {
    for (const [id, el] of Object.entries(this.screens)) {
      if (id === screenId) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    }

    if (screenId === 'title' || screenId === 'pov') {
      this.header.classList.add('hidden');
    } else {
      this.header.classList.remove('hidden');
    }
  }

  // POV selection screen
  renderPovCards(povs, completedPovs, onSelect) {
    const container = document.getElementById('pov-cards');
    container.innerHTML = '';

    for (const pov of povs) {
      const card = document.createElement('div');
      card.className = 'pov-card';
      if (completedPovs.includes(pov.pov_id)) {
        card.classList.add('completed');
      }

      card.innerHTML = `
        <div class="pov-card-character">${pov.character}</div>
        <div class="pov-card-qualifier">${pov.qualifier}</div>
      `;

      card.addEventListener('click', () => onSelect(pov.pov_id));
      container.appendChild(card);
    }
  }

  // Chapter transition card
  showChapterCard(title, subtitle) {
    return new Promise((resolve) => {
      const narrativeArea = this.getNarrativeArea();
      narrativeArea.innerHTML = '';

      const card = document.createElement('div');
      card.className = 'chapter-card';
      card.innerHTML = `
        <div class="chapter-card-title">${title}</div>
        <div class="chapter-card-subtitle">${subtitle}</div>
      `;
      narrativeArea.appendChild(card);

      // Fade in, hold, fade out
      requestAnimationFrame(() => {
        card.classList.add('visible');
        setTimeout(() => {
          card.classList.add('fading');
          setTimeout(() => {
            narrativeArea.innerHTML = '';
            resolve();
          }, 800);
        }, 2000);
      });
    });
  }

  // Play screen
  setSceneTitle(title) {
    document.getElementById('scene-title').textContent = title;
  }

  setSceneSubtitle(subtitle) {
    // The subtitle is shown in the chapter card, not persistent
  }

  getNarrativeArea() {
    return document.getElementById('narrative-area');
  }

  renderChoices(choices, tokensAvailable, onChoose, onUnlockKobayashi) {
    const container = document.getElementById('choices-area');
    container.innerHTML = '';
    container.classList.remove('hidden');

    for (const choice of choices) {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';

      if (choice.kobayashi && !choice._unlocked) {
        btn.classList.add('kobayashi-locked');
        if (!tokensAvailable) {
          btn.classList.add('no-tokens');
        }
        btn.innerHTML = `
          <span class="choice-key">${choice.key}</span>
          <span>&#128274; Scelta nascosta</span>
          <span class="token-cost">&#9670; 1</span>
        `;
        if (tokensAvailable) {
          btn.addEventListener('click', () => onUnlockKobayashi(choice));
        }
      } else if (choice.kobayashi && choice._unlocked) {
        btn.classList.add('kobayashi');
        btn.innerHTML = `
          <span class="choice-key">${choice.key}</span>
          <span>${choice.text}</span>
        `;
        btn.addEventListener('click', () => onChoose(choice.key));
      } else if (choice.visible) {
        btn.innerHTML = `
          <span class="choice-key">${choice.key}</span>
          <span>${choice.text}</span>
        `;
        btn.addEventListener('click', () => onChoose(choice.key));
      }

      if (choice.visible || choice.kobayashi) {
        container.appendChild(btn);
      }
    }
  }

  highlightChoice(key, isTimeout = false) {
    const container = document.getElementById('choices-area');
    const buttons = container.querySelectorAll('.choice-btn');
    buttons.forEach(btn => {
      btn.style.pointerEvents = 'none';
      const keySpan = btn.querySelector('.choice-key');
      if (keySpan && keySpan.textContent === key) {
        btn.classList.add(isTimeout ? 'timeout' : 'selected');
      } else {
        btn.style.opacity = '0.3';
      }
    });
  }

  hideChoices() {
    const container = document.getElementById('choices-area');
    container.classList.add('hidden');
    container.innerHTML = '';
  }

  showGhostEvent(text) {
    const el = document.getElementById('ghost-event');
    el.textContent = text;
    el.classList.remove('hidden');
    el.style.opacity = '0';

    requestAnimationFrame(() => {
      el.style.opacity = '1';
    });

    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.classList.add('hidden'), 600);
    }, 3000);
  }

  showTimeoutText() {
    const area = this.getNarrativeArea();
    const el = document.createElement('div');
    el.className = 'timer-expired-text';
    el.textContent = 'Il tempo ha scelto per te.';
    area.appendChild(el);
  }

  // Summary / Final Reveal screen
  renderSummary(observations, dimensionData, showReplayHint = false) {
    const obsEl = document.getElementById('summary-observations');
    obsEl.innerHTML = '';
    observations.forEach((text, i) => {
      const div = document.createElement('div');
      div.className = 'summary-observation';
      div.textContent = text;
      div.style.opacity = '0';
      div.style.animation = `reveal-fade-in 0.8s ease ${0.3 + i * 0.5}s forwards`;
      obsEl.appendChild(div);
    });

    const dimEl = document.getElementById('summary-dimensions');
    dimEl.innerHTML = '';
    dimensionData.forEach((dim, i) => {
      const bar = document.createElement('div');
      bar.className = 'dimension-bar';
      bar.style.opacity = '0';
      bar.style.animation = `reveal-fade-in 0.8s ease ${0.3 + (observations.length + i) * 0.4}s forwards`;
      bar.innerHTML = `
        <div class="dimension-label">
          <span>${dim.labelA}</span>
          <span>${dim.labelB}</span>
        </div>
        <div class="dimension-track">
          <div class="marker" style="left: ${dim.normalized * 100}%"></div>
        </div>
      `;
      dimEl.appendChild(bar);
    });
  }
}
