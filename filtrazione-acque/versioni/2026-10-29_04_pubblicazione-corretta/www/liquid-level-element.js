class LiquidLevelElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('Devi specificare entity');
    }

    this._config = {
      min: 0,
      max: 100,
      color_top: 'rgba(55, 205, 255, 0.68)',
      color_bottom: 'rgba(0, 105, 235, 0.62)',
      wave_color: 'rgba(170, 240, 255, 0.78)',
      wave_speed: 3.6,
      ...config,
    };

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .tank {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: transparent;
        }

        .fill {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 0%;
          background: linear-gradient(
            to bottom,
            var(--water-top),
            var(--water-bottom)
          );
          transition: height 1.2s ease-in-out;
          will-change: height;
        }

        .fill::before,
        .fill::after {
          content: '';
          position: absolute;
          left: -20%;
          width: 140%;
          pointer-events: none;
        }

        .fill::before {
          top: -8px;
          height: 16px;
          background:
            radial-gradient(
              ellipse at 50% 100%,
              var(--wave-color) 0 48%,
              transparent 50% 100%
            ) 0 0 / 34px 16px repeat-x;
          animation: wave-left var(--wave-speed) linear infinite;
          opacity: 0.95;
        }

        .fill::after {
          top: -5px;
          height: 13px;
          background:
            radial-gradient(
              ellipse at 50% 100%,
              rgba(255,255,255,0.20) 0 45%,
              transparent 48% 100%
            ) 0 0 / 46px 13px repeat-x;
          animation: wave-right calc(var(--wave-speed) * 1.35) linear infinite;
          opacity: 0.7;
        }

        @keyframes wave-left {
          from { transform: translateX(0); }
          to   { transform: translateX(34px); }
        }

        @keyframes wave-right {
          from { transform: translateX(0); }
          to   { transform: translateX(-46px); }
        }
      </style>

      <div class="tank">
        <div class="fill"></div>
      </div>
    `;

    this._fill = this.shadowRoot.querySelector('.fill');

    this._fill.style.setProperty(
      '--water-top',
      this._config.color_top
    );

    this._fill.style.setProperty(
      '--water-bottom',
      this._config.color_bottom
    );

    this._fill.style.setProperty(
      '--wave-color',
      this._config.wave_color
    );

    this._fill.style.setProperty(
      '--wave-speed',
      `${this._config.wave_speed}s`
    );
  }

  set hass(hass) {
    if (!this._config || !this._fill) return;

    const stateObj = hass.states[this._config.entity];

    const raw = stateObj
      ? Number.parseFloat(stateObj.state)
      : NaN;

    if (!Number.isFinite(raw)) {
      this._fill.style.height = '0%';
      this._fill.style.visibility = 'hidden';
      return;
    }

    const min = Number(this._config.min ?? 0);
    const max = Number(this._config.max ?? 100);

    const clamped = Math.min(
      max,
      Math.max(min, raw)
    );

    const pct =
      ((clamped - min) / (max - min)) * 100;

    this._fill.style.visibility =
      pct <= 0 ? 'hidden' : 'visible';

    this._fill.style.height = `${pct}%`;
  }

  getCardSize() {
    return 1;
  }
}

if (!customElements.get('liquid-level-element')) {
  customElements.define(
    'liquid-level-element',
    LiquidLevelElement
  );
}