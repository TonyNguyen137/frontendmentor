export class Backdrop {
  constructor({ rootEl, collapseEl }) {
    this._navbarEl = rootEl
    this._collapseEl = collapseEl
    this._initEventHandlers()
  }

  _initEventHandlers() {
    this._navbarEl.addEventListener('custom:toggled', this._handleMenuToggled.bind(this))
    this._collapseEl.addEventListener('transitionend', this._remove.bind(this))
  }

  _handleMenuToggled(event) {
    const { isExpanded, removeBackdropImmidiately } = event.detail
    isExpanded ? this._insert() : this._fadeOut(removeBackdropImmidiately)
  }

  _insert() {
    this._backdropEl = document.createElement('div')
    this._backdropEl.classList.add('backdrop', 'fade')
    document.body.appendChild(this._backdropEl)
    this._backdropEl.offsetHeight // force reflow
    this._backdropEl.classList.add('show')
  }

  _fadeOut(immidiately = false) {
    immidiately ? this._backdropEl.remove() : this._backdropEl.classList.remove('show')
  }

  _remove(e) {
    if (e.target.matches('.show')) return
    this._backdropEl.remove()
  }
}
