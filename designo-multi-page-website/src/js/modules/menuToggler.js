import {
  CSS_HIDDEN,
  CSS_TRANSITIONING,
  CSS_EXPANDED,
} from '../helpers/navbarCSS.js';

export class MenuToggle {
  constructor(navbarEl) {
    const { openBtnEl, closeBtnEl, menubarWrapperEl } = navbarEl;
    openBtnEl.addEventListener(
      'click',
      this.#toggleMenuHandler.bind(this, navbarEl)
    );

    closeBtnEl.addEventListener(
      'click',
      this.#toggleMenuHandler.bind(this, navbarEl)
    );

    menubarWrapperEl.addEventListener(
      'transitionend',
      this.#transitionHandler.bind(null, navbarEl)
    );
  }

  #removeA11yAttribute(nodeEl, ...attributeNames) {
    attributeNames.forEach((attribute) => {
      nodeEl.removeAttribute(attribute);
    });
  }

  #addA11yAttribute(nodeEl, ...attributeObjects) {
    attributeObjects.forEach((object) => {
      const [name, value] = Object.entries(object)[0];
      nodeEl.setAttribute(name, value);
    });
  }

  //Event Handlers
  #toggleMenuHandler({ openBtnEl, menubarWrapperEl }) {
    let isClosed = openBtnEl.getAttribute('aria-expanded') === 'false' || false;
    openBtnEl.setAttribute('aria-expanded', isClosed);

    if (isClosed) {
      menubarWrapperEl.classList.add(CSS_TRANSITIONING, CSS_EXPANDED);
      menubarWrapperEl.classList.remove(CSS_HIDDEN);
      menubarWrapperEl.focus();

      this.#addA11yAttribute(
        menubarWrapperEl,
        { 'aria-modal': true },
        { role: 'dialog' }
      );
    } else {
      menubarWrapperEl.classList.add(CSS_TRANSITIONING);
      menubarWrapperEl.classList.remove(CSS_EXPANDED);

      this.#removeA11yAttribute(menubarWrapperEl, 'aria-modal', 'role');
    }
  }

  #transitionHandler({ menubarWrapperEl, openBtnEl }, e) {
    if (e.target !== menubarWrapperEl) return;

    menubarWrapperEl.classList.remove(CSS_TRANSITIONING);

    // [Accessibility] Add 'visiblity:hidden' if the menu is collapsed
    openBtnEl.getAttribute('aria-expanded') === 'false' &&
      menubarWrapperEl.classList.add(CSS_HIDDEN);
  }
}
