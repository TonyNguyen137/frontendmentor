import { $ } from '../helpers/utils.js';
import { TabToggler } from '../modules/tabToggler.js';

export class Tabs {
  #modules = [TabToggler];
  constructor(tabEl) {
    this.tabEl = typeof tabEl === 'string' ? $(tabEl) : tabEl;

    this.tabsEls = this.tabEl.querySelectorAll('.tab-js');
    this.tablistEl = this.tabEl.querySelector('.tablist-js');

    this.#mountModules();
  }

  #mountModules() {
    this.#modules.forEach((Module) => {
      new Module(this);
    });
  }
}
