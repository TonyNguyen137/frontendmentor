import { CSS_HIDDEN, CSS_EXPANDED } from '../helpers/navbarCSS.js';
import { breakPoints } from '../helpers/breakpoints.js';

export class MediaQuery {
  #navbarEl;
  #mediaQuery;

  constructor(navbarEl) {
    this.#navbarEl = navbarEl;
    const { BP_KEY } = navbarEl;

    this.#mediaQuery = window.matchMedia(`(min-width: ${breakPoints[BP_KEY]})`);

    this.#mediaQuery.addEventListener(
      'change',
      this.#onMediaQueryChangeHandler.bind(this)
    );

    this.#onMediaQueryChangeHandler(this.#mediaQuery);
  }

  #onMediaQueryChangeHandler(mediaQuery) {
    const { menubarWrapperEl } = this.#navbarEl;

    // desktop menubar
    if (mediaQuery.matches) {
      this.#closeMenuImmediately();
      this.#removeA11yAttribute('aria-modal', 'role');

      // mobile menubar
    } else {
      menubarWrapperEl.classList.add(CSS_HIDDEN);
    }
  }

  #closeMenuImmediately() {
    const { openBtnEl, menubarWrapperEl } = this.#navbarEl;

    openBtnEl.setAttribute('aria-expanded', 'false');
    menubarWrapperEl.classList.remove(CSS_EXPANDED, CSS_HIDDEN);
    this.#removeA11yAttribute(menubarWrapperEl, 'role', 'aria-modal');
  }

  #removeA11yAttribute(...attributeNames) {
    const { menubarWrapperEl } = this.#navbarEl;
    attributeNames.forEach((attribute) => {
      menubarWrapperEl.removeAttribute(attribute);
    });
  }
}
