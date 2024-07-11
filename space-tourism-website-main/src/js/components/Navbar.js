import { $ } from '../helpers/utils.js';
import { MenuToggle } from '../modules/menuToggler.js';
import { KeyDown } from '../modules/keyDown.js';
import { MediaQuery } from '../modules/mediaQuery.js';

export class Navbar {
  #modules = [MenuToggle, MediaQuery, KeyDown];

  constructor(navbarEl, transitionDurationValue = 300) {
    // init member variables
    this.navbarEl = typeof navbarEl === 'string' ? $(navbarEl) : navbarEl;
    this.tabbableListEl = this.navbarEl.querySelectorAll('.link-js, .close-js');
    this.firstTabbableEl = this.tabbableListEl[0];
    this.lastTabbableEl = this.tabbableListEl[this.tabbableListEl.length - 1];
    this.menubarWrapperEl = this.navbarEl.querySelector('.wrapper-js');
    this.openBtnEl = this.navbarEl.querySelector('.open-js');
    this.closeBtnEl = this.menubarWrapperEl.querySelector('.close-js');
    this.BP_KEY = this.navbarEl.getAttribute('data-expanded');

    // set transition duration
    this.navbarEl.style.setProperty(
      '--transition-duration',
      `${transitionDurationValue}ms`
    );

    // invoke Modules
    this.#mountModules();
  }

  #mountModules() {
    this.#modules.forEach((Module) => {
      new Module(this);
    });
  }
}
