import { $ } from '../utils'
import { Backdrop, Tabber } from '../modules'

const documentEl = document.documentElement

export class Navbar {
  constructor(rootEl = '.navbar', options = {}) {
    this._rootEl = typeof rootEl === 'string' ? $(rootEl) : rootEl
    this._expandBreakpoint = this._rootEl.dataset.expand
    this._expandWidth = getComputedStyle(documentEl).getPropertyValue(`--${this._expandBreakpoint}`)
    this._toggleEl = this._rootEl.querySelector('.navbar__toggle')
    this._collapseEl = this._rootEl.querySelector('.navbar__collapse')
    this._tabbableEls = this._rootEl.querySelectorAll('.navbar__toggle, .navbar__link')

    this._isExpanded = false
    this._isTransitioning = false
    this._hasModuleInstance = false
    this._modules = [Backdrop, Tabber, ...(options?.modules || [])]

    this._initEventHandlers()
    this._media = window.matchMedia(`(min-width: ${this._expandWidth})`)
    this._media.addEventListener('change', this._handleMediaChange.bind(this))
    this._handleMediaChange(this._media)
  }

  _initEventHandlers() {
    this._toggleEl.addEventListener('click', this._toggleMenu.bind(this))
    this._collapseEl.addEventListener('transitionend', this._onMenuTransitionEnd.bind(this))
  }

  _setExpanded(state) {
    this._toggleEl.ariaExpanded = state
  }

  _getExpanded(state) {
    return this._toggleEl.ariaExpanded === 'true'
  }

  _dispatchEvent(data) {
    const options = { isExpanded: this._isExpanded, ...(data || {}) }

    const event = new CustomEvent('custom:toggled', { detail: options })
    this._rootEl.dispatchEvent(event)
  }

  // Event handlers
  _handleMediaChange(e) {
    if (e.matches) {
      this._resetMenu({ removeBackdropImmidiately: true })
      return
    }

    this._instantiateModules()
  }

  _instantiateModules() {
    if (!this._hasModuleInstance) {
      this._modules.forEach((Module) => {
        new Module({
          rootEl: this._rootEl,
          tabbableEls: this._tabbableEls,
          collapseEl: this._collapseEl,
        })
      })
      this._hasModuleInstance = true
    }
  }
  _toggleMenu(e) {
    if (this._isTransitioning) return
    this._isTransitioning = true
    this._isExpanded = this._getExpanded()
    this._isExpanded ? this._closeMenu() : this._openMenu()
    this._dispatchEvent()
  }

  _openMenu() {
    this._toggleExpanded()
    this._setExpanded(this._isExpanded)
    this._collapseEl.classList.remove('collapse')
    const scrollHeight = this._collapseEl.scrollHeight

    this._collapseEl.classList.add('collapsing')
    // Force reflow
    this._collapseEl.offsetHeight
    this._collapseEl.style.height = `${scrollHeight}px`

    // Use requestAnimationFrame for smoother rendering
    requestAnimationFrame(() => {})
  }

  _closeMenu(e) {
    this._toggleExpanded()
    this._setExpanded(this._isExpanded)

    this._collapseEl.classList.remove('collapse', 'show')
    this._collapseEl.classList.add('collapsing')
    this._collapseEl.style = ''
  }

  _resetMenu(additionalData) {
    if (!this._isExpanded) return

    this._toggleExpanded() // this._isExpanded = false
    this._setExpanded(this._isExpanded)
    this._collapseEl.classList.remove('show')
    this._collapseEl.style = ''

    this._dispatchEvent(additionalData)
  }

  _toggleExpanded() {
    this._isExpanded = !this._isExpanded
  }

  _onMenuTransitionEnd() {
    if (this._isExpanded) {
      this._collapseEl.classList.remove('collapsing')
      this._collapseEl.classList.add('collapse', 'show')
      // this._collapseEl.style = ''
    } else {
      this._collapseEl.classList.remove('collapsing')
      this._collapseEl.classList.add('collapse')
    }
    this._isTransitioning = false
  }
}
