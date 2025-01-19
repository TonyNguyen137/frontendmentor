import { setAttributes } from './helpers';

export class Backdrop {
  constructor({ z = 2, transitionDuration = 150, opacity = 0.5 } = {}) {
    this._create(z, transitionDuration, opacity);
  }
  _create(z, transitionDuration, opacity) {
    this._backdrop = document.createElement('div');

    this._backdrop.classList.add('backdrop');
    setAttributes(this._backdrop, {
      style: `--z-index:${z}; --transition-duration: ${transitionDuration}ms; --opacity: ${opacity}`,
      'data-transition': 'fade',
    });

    this._backdrop.dataset.transitionDuration = transitionDuration;
  }

  addTo(target) {
    target.appendChild(this._backdrop);

    setTimeout(() => {
      this._backdrop.setAttribute('data-state', 'show');
    });
  }

  kill() {
    let transitionEnd = this._backdrop.dataset.transitionDuration;
    this._backdrop.removeAttribute('data-state', 'show');
    setTimeout(() => {
      this._backdrop.remove();
    }, transitionEnd);
  }
}
