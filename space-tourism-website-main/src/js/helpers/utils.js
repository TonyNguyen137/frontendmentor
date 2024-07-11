export function $(selector) {
  let element = document.querySelectorAll(selector);
  if (element.length > 1) return element;
  else return element[0];
}
