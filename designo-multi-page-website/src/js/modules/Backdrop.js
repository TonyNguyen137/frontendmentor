export class Backdrop {
  constructor({ rootEl }) {
    this._navbarEl = rootEl
    this._insertBackdrop()
    this._initEventHandlers()
  }

  _initEventHandlers() {
    this._navbarEl.addEventListener('custom:toggled', this._handleMenuToggled.bind(this))
  }

  _handleMenuToggled(event) {
    const { isExpanded } = event.detail
    isExpanded ? this._showBackdrop() : this._removeBackdrop()
  }

  _insertBackdrop() {
    this._backdropEl = document.createElement('div')
    this._backdropEl.classList.add('backdrop', 'fade')
    this._backdropEl.ariaHidden = true
    document.body.appendChild(this._backdropEl)
  }
  _showBackdrop() {
    this._backdropEl.classList.add('show')
  }
  _removeBackdrop() {
    this._backdropEl.classList.remove('show')
    // this._backdropEl.remove()
  }
}
