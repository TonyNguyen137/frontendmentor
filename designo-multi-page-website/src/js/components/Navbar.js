import { $ } from '../utils'

export class Navbar {
  constructor(rootEl = '.navbar') {
    this._rootEl = typeof rootEl === 'string' ? $(rootEl) : rootEl
    this._toggleEl = this._rootEl.querySelector('.navbar__toggle')
    this._collapseEl = this._rootEl.querySelector('.navbar__collapse')
    this._listEl = this._rootEl.querySelector('.navbar__list')
    this._isExpanded = null
    // this._firstTabbableEl = this._togglerEl
    // this._lastTabbableEl = Array.from(document.querySelectorAll('.navbar-js .navbar__link')).at(-1)
    // this._backdropEl = new Backdrop()

    // Make the element focusable when the navigation menu is expanded
    // this._menuEl.setAttribute('tabindex', '-1')

    this._initEventHandlers()
    // this._mount(this._modules)
  }

  _initEventHandlers() {
    this._toggleEl.addEventListener('click', this._toggleMenu.bind(this))
    this._collapseEl.addEventListener('transitionend', this._onMenuTransitionEnd.bind(this))

    // document.addEventListener('keypress', (e) => {
    //   if (!this.expanded) return
    //   if (e.key === 'Escape') this._closeMenu()
    // })
  }

  _setExpanded(state) {
    this._toggleEl.ariaExpanded = state
  }

  _getExpanded(state) {
    return this._toggleEl.ariaExpanded === 'true'
  }

  // _mount(modules) {
  //   if (modules.length < 1) return

  //   modules.forEach((Module) => {
  //     new Module(this)
  //   })
  // }

  // Event handlers
  _toggleMenu(e) {
    this._isExpanded = this._getExpanded()
    this._isExpanded ? this._closeMenu() : this._openMenu()
  }

  _openMenu() {
    this._setExpanded(!this._isExpanded)

    // this._collapseEl.removeAttribute('data-state')
    // let height = this._collapseEl.offsetHeight / 16
    // this._collapseEl.setAttribute('data-state', 'collapsing')
    // this._backdropEl.addTo($('body'))
    // this._menuEl.focus()

    // setTimeout(() => {
    //   this._collapseEl.style.setProperty('height', `${height}rem`)
    // })
  }

  _closeMenu(e) {
    this._setExpanded(!this._isExpanded)

    // this._collapseEl.style.removeProperty('height')
    // this._backdropEl.kill()
    // this._collapseEl.setAttribute('data-state', 'collapsing')
    // this._togglerEl.focus()
  }

  _onMenuTransitionEnd() {
    if (this.expanded) {
      this._collapseEl.removeAttribute('data-state')
    } else {
      this._collapseEl.setAttribute('data-state', 'collapsed')
    }
  }
}
