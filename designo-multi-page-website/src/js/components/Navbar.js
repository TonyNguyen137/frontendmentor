import { $, Backdrop } from '../utils';
import { Tabber } from '../modules';

export class Navbar {
  constructor(navbarEl, transitionDuration = 300) {
    // init member variables
    this._modules = [Tabber];
    this._navbarEl = typeof navbarEl === 'string' ? $(navbarEl) : navbarEl;
    this._togglerEl = this._navbarEl.querySelector('.navbar__toggler');
    this._collapseEl = this._navbarEl.querySelector('.navbar__collapse');
    this._menuEl = this._navbarEl.querySelector('.navbar__menu-list');
    this._firstTabbableEl = this._togglerEl;
    this._lastTabbableEl = Array.from(
      document.querySelectorAll('.navbar-js .navbar__link')
    ).at(-1);

    this._backdropEl = new Backdrop();
    this._navbarEl.style.setProperty(
      '--transition-duration',
      `${transitionDuration}ms`
    );

    // Make the element focusable when the navigation menu is expanded
    this._menuEl.setAttribute('tabindex', '-1');

    this._initEventHandlers();
    this._mount(this._modules);
  }

  _initEventHandlers() {
    this._togglerEl.addEventListener('click', this._toggleMenu.bind(this));
    this._collapseEl.addEventListener(
      'transitionend',
      this._onMenuTransitionEnd.bind(this)
    );

    document.addEventListener('keypress', (e) => {
      if (!this.expanded) return;
      if (e.key === 'Escape') this._closeMenu();
    });
  }

  get expanded() {
    return this._togglerEl.getAttribute('aria-expanded') === 'true'
      ? true
      : false;
  }

  set expanded(state) {
    this._togglerEl.setAttribute('aria-expanded', state);
  }

  _mount(modules) {
    if (modules.length < 1) return;

    modules.forEach((Module) => {
      new Module(this);
    });
  }

  // Event handlers
  _toggleMenu(e) {
    if (!this.expanded) {
      this._openMenu();
    } else {
      this._closeMenu();
    }
  }

  _openMenu(e) {
    this._togglerEl.setAttribute('aria-expanded', !this.expanded);
    this._collapseEl.removeAttribute('data-state');
    let height = this._collapseEl.offsetHeight / 16;
    this._collapseEl.setAttribute('data-state', 'collapsing');
    this._backdropEl.addTo($('body'));
    this._menuEl.focus();

    setTimeout(() => {
      this._collapseEl.style.setProperty('height', `${height}rem`);
    });
  }

  _closeMenu(e) {
    this._togglerEl.setAttribute('aria-expanded', !this.expanded);
    this._collapseEl.style.removeProperty('height');
    this._backdropEl.kill();
    this._collapseEl.setAttribute('data-state', 'collapsing');
    this._togglerEl.focus();
  }

  _onMenuTransitionEnd() {
    if (this.expanded) {
      this._collapseEl.removeAttribute('data-state');
    } else {
      this._collapseEl.setAttribute('data-state', 'collapsed');
    }
  }
}

// export class NavbarOffset {
//   #modules = [MenuToggle, MediaQuery, KeyDown];

//   constructor(navbarEl, transitionDurationValue = 300) {
//     // init member variables
//     this.navbarEl = typeof navbarEl === 'string' ? $(navbarEl) : navbarEl;
//     this.tabbableListEl = this.navbarEl.querySelectorAll('.link-js, .close-js');
//     this.firstTabbableEl = this.tabbableListEl[0];
//     this.lastTabbableEl = this.tabbableListEl[this.tabbableListEl.length - 1];
//     this.menubarWrapperEl = this.navbarEl.querySelector('.wrapper-js');
//     this.openBtnEl = this.navbarEl.querySelector('.open-js');
//     this.closeBtnEl = this.menubarWrapperEl.querySelector('.close-js');
//     this.BP_KEY = this.navbarEl.getAttribute('data-expanded');

//     // set transition duration
//     this.navbarEl.style.setProperty(
//       '--transition-duration',
//       `${transitionDurationValue}ms`
//     );

//     // invoke Modules
//     this.#mountModules();
//   }

//   #mountModules() {
//     this.#modules.forEach((Module) => {
//       new Module(this);
//     });
//   }
// }
