import { CSS_HIDDEN, CSS_EXPANDED } from '../helpers/navbarCSS';
export class KeyDown {
  #firstTabbableEl;
  #lastTabbableEl;
  #openBtnEl;
  #menubarWrapperEl;
  constructor(navbarEl) {
    this.#firstTabbableEl = navbarEl.firstTabbableEl;
    this.#lastTabbableEl = navbarEl.lastTabbableEl;
    this.#openBtnEl = navbarEl.openBtnEl;
    this.#menubarWrapperEl = navbarEl.menubarWrapperEl;
    document.addEventListener('keydown', this.#initKeydownHandler.bind(this));

    console.log(this.#firstTabbableEl);
  }

  #initKeydownHandler(e) {
    if (this.#openBtnEl.getAttribute('aria-expanded') === 'false') return;

    switch (e.key) {
      case 'Escape':
        this.#closeMenuImmediately();
        break;
      case 'Tab':
        const target = e.target;
        const shiftPressed = e.shiftKey;

        let borderElem = shiftPressed
          ? this.#firstTabbableEl
          : this.#lastTabbableEl;

        if (target === borderElem) {
          e.preventDefault();
          borderElem === this.#firstTabbableEl
            ? this.#lastTabbableEl.focus()
            : this.#firstTabbableEl.focus();
        }

        break;

      default:
        break;
    }
  }

  #closeMenuImmediately() {
    this.#openBtnEl.setAttribute('aria-expanded', 'false');
    this.#menubarWrapperEl.classList.remove(CSS_EXPANDED, CSS_HIDDEN);
    this.#removeA11yAttribute(this.#menubarWrapperEl, 'role', 'aria-modal');
  }

  #removeA11yAttribute(nodeEl, ...attributeNames) {
    attributeNames.forEach((attribute) => {
      nodeEl.removeAttribute(attribute);
    });
  }
}
