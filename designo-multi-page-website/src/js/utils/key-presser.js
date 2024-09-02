export class KeyPresser {
  constructor(element, key, callback) {
    element.addEventListener('keydown', (e) => {
      if (e.code === key) {
        callback();
      }
    });
  }
}
