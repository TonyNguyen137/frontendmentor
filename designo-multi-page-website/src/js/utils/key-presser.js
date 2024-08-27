export class KeyPresser {
  constructor(element, key, callback) {
    element.addEventListener('keydown', (e) => {
      console.log(e.code);
      console.log('key: ', key);

      if (e.code === key) {
        callback();
      }
    });
  }
}
