export class Tabber {
  constructor({ rootEl, tabbableEls }) {
    this._navbarEl = rootEl
    this._boundKeydownHandler = this._keydownHandler.bind(this)

    this._firstTabbableEl = tabbableEls[0]
    this._lastTabbableEl = tabbableEls[tabbableEls.length - 1]

    this._navbarEl.addEventListener('custom:toggled', this._handleMenuToggled.bind(this))
  }

  _handleMenuToggled(event) {
    const { isExpanded } = event.detail
    isExpanded ? this._addKeydownListener() : this._removeKeydownListener()
  }

  _addKeydownListener() {
    document.addEventListener('keydown', this._boundKeydownHandler)
  }

  _removeKeydownListener() {
    document.removeEventListener('keydown', this._boundKeydownHandler)
  }

  _keydownHandler(event) {
    if (event.key === 'Tab') {
      console.log('target: ', event.target)

      const target = event.target
      const shiftPressed = event.shiftKey

      let borderElem = shiftPressed ? this._firstTabbableEl : this._lastTabbableEl
      console.log('borderElem: ', borderElem)

      if (target === borderElem) {
        event.preventDefault()
        console.log('in if')

        borderElem === this._firstTabbableEl
          ? this._lastTabbableEl.focus()
          : this._firstTabbableEl.focus()
      }
    }
  }
}
