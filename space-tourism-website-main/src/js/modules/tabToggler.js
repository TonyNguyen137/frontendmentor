const CSS_TAB_ACTIVE = 'tabs__button--active';
const CSS_PANEL_ACTIVE = 'tabs__panel--active';
const CSS_IMAGE_ACTIVE = 'image-container__image--active';

export class TabToggler {
  #tabEl;
  #tablistEl;
  #tabsEls;
  #MAX_LENGTH;

  constructor(nodeEl) {
    this.#tabEl = nodeEl.tabEl;
    this.#tablistEl = nodeEl.tablistEl;
    this.#tabsEls = Array.from(nodeEl.tabsEls);
    this.#MAX_LENGTH = this.#tabsEls.length - 1;
    this.#tablistEl.addEventListener('click', this.#clickHandler.bind(this));
    this.#tablistEl.addEventListener('keydown', this.#keyPressed.bind(this));
  }

  #clickHandler(e) {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains(CSS_TAB_ACTIVE)
    )
      return;

    this.#removeCurrent();
    this.#addCurrent(e.target);
  }

  #keyPressed(e) {
    console.log('target: ', e);
    let targetIndex = this.#tabsEls.indexOf(e.target);
    console.log('target: ', targetIndex);
    console.log('max: ', this.#MAX_LENGTH);

    if (e.key === 'ArrowRight') {
      if (targetIndex === this.#MAX_LENGTH) {
        targetIndex = 0;
        this.#tabsEls[targetIndex].focus();
      } else {
        this.#tabsEls[++targetIndex].focus();
      }

      this.#removeCurrent();
      this.#addCurrent(this.#tabsEls[targetIndex]);
    }

    if (e.key === 'ArrowLeft') {
      if (targetIndex === 0) {
        targetIndex = this.#MAX_LENGTH;
        this.#tabsEls[targetIndex].focus();
      } else {
        this.#tabsEls[--targetIndex].focus();
      }
      this.#removeCurrent();
      this.#addCurrent(this.#tabsEls[targetIndex]);
    }
  }

  #removeCurrent() {
    // remove css-class & adjust a11y attributes of current active Tab, Panel & Image
    let currentSelectedTab = this.#tablistEl.querySelector(
      `.${CSS_TAB_ACTIVE}`
    );

    currentSelectedTab.classList.remove(CSS_TAB_ACTIVE);
    currentSelectedTab.setAttribute('aria-selected', false);
    currentSelectedTab.setAttribute('tabindex', '-1');

    this.#tabEl
      .querySelector(`.${CSS_PANEL_ACTIVE}`)
      .classList.remove(CSS_PANEL_ACTIVE);

    document
      .querySelector(`.${CSS_IMAGE_ACTIVE}`)
      .classList.remove(CSS_IMAGE_ACTIVE);
  }

  #addCurrent(tab) {
    // Add css-class to selected Tab, and corresponding Panel and Image
    const [PANEL_ID, IMAGE_ID] = tab.getAttribute('aria-controls').split(' ');

    tab.classList.add(CSS_TAB_ACTIVE);
    tab.setAttribute('aria-selected', true);
    tab.setAttribute('tabindex', '0');

    this.#tabEl.querySelector(`#${PANEL_ID}`).classList.add(CSS_PANEL_ACTIVE);
    document.querySelector(`#${IMAGE_ID}`).classList.add(CSS_IMAGE_ACTIVE);
  }
}
