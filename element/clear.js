/* clear.js [ 01.05.2020 : 17:09:08 ] */

/**
 * Очищает все дочерние элементы.
 * 
 * @memberof element
 * @param {HTMLElement} element
 * @example
 * clear(element)
 * // => element.childNodes.length === 0
 */
function clear(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

export default clear
