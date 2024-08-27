import { $, Backdrop, KeyPresser } from '../utils/index';

// import { MenuToggle } from '../modules/menuToggler.js';
// import { KeyDown } from '../modules/keyDown.js';
// import { MediaQuery } from '../modules/mediaQuery.js';

export class Navbar {
  constructor(navbarEl, transitionDuration = 300) {
    // init member variables
    this._navbarEl = typeof navbarEl === 'string' ? $(navbarEl) : navbarEl;
    this._togglerEl = this._navbarEl.querySelector('.navbar__toggler');
    this._collapseEl = this._navbarEl.querySelector('.navbar__collapse');
    this._menuListEl = this._navbarEl.querySelector('ul');
    this._isExpanded =
      this._togglerEl.getAttribute('aria-expanded') === 'true' ? true : false;
    this._backdropEl = new Backdrop();
    this._modules = [];

    // set transition duration
    this._navbarEl.style.setProperty(
      '--transition-duration',
      `${transitionDuration}ms`
    );

    this._initEventHandlers();
    this._mount(...this._modules);
  }

  _initEventHandlers() {
    this._togglerEl.addEventListener('click', this._toggleMenu.bind(this));
    this._collapseEl.addEventListener(
      'transitionend',
      this._onMenuTransitionEnd.bind(this)
    );
    new KeyPresser(window, 'Escape', () => {
      if (!this._isExpanded) return;

      this._closeMenu();
    });
  }

  _mount(...modules) {
    modules.forEach((Module) => {
      new Module(this);
    });
  }

  // Event handlers
  _toggleMenu() {
    if (!this._isExpanded) {
      this._openMenu();
    } else {
      this._closeMenu();
    }
  }

  _openMenu() {
    this._togglerEl.setAttribute('aria-expanded', !this._isExpanded);
    this._isExpanded = !this._isExpanded;
    console.log('inside openMenu: ', this._isExpanded);

    this._collapseEl.removeAttribute('data-state');
    let height = this._collapseEl.offsetHeight / 16;
    this._collapseEl.setAttribute('data-state', 'collapsing');
    this._togglerEl.disabled = true;
    this._backdropEl.addTo($('body'));
    setTimeout(() => {
      this._collapseEl.style.setProperty('height', `${height}rem`);
    });
  }

  _closeMenu() {
    this._togglerEl.setAttribute('aria-expanded', !this._isExpanded);
    this._isExpanded = !this._isExpanded;
    this._collapseEl.style.removeProperty('height');

    this._backdropEl.kill();

    this._collapseEl.setAttribute('data-state', 'collapsing');
    this._togglerEl.disabled = true;
  }

  _onMenuTransitionEnd() {
    if (this._isExpanded) {
      this._collapseEl.removeAttribute('data-state');
    } else {
      this._collapseEl.setAttribute('data-state', 'collapsed');
    }
    this._togglerEl.disabled = false;
  }

  //   #mountModules() {
  //     this.#modules.forEach((Module) => {
  //       new Module(this);
  //     });
  //   }
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
