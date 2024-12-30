export function $(selector) {
  let element = document.querySelectorAll(selector)
  if (element.length > 1) return element
  else return element[0]
}

export function setAttributes(element, attributes) {
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

export function toArray(nodeList) {
  if (typeof nodeList === 'string') {
    return Array.from(document.querySelectorAll(nodeList))
  }
  return Array.from(nodeList)
}
