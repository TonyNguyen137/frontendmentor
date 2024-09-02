export class Tabber {
  constructor(navbarEl) {
    document.addEventListener(
      'keydown',
      this._keydownHandler.bind(this, navbarEl)
    );
  }

  _keydownHandler(navbarEl, e) {
    if (!navbarEl.expanded) return;

    if (e.key === 'Tab') {
      const target = e.target;
      const shiftPressed = e.shiftKey;
      console.log('target: ', target);

      let borderElem = shiftPressed
        ? navbarEl._firstTabbableEl
        : navbarEl._lastTabbableEl;

      if (target === borderElem) {
        e.preventDefault();
        borderElem === navbarEl._firstTabbableEl
          ? navbarEl._lastTabbableEl.focus()
          : navbarEl._firstTabbableEl.focus();
      }
    }
  }
}
