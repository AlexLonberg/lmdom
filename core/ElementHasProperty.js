/* ElementHasProperty.js [ 01.05.2020 : 01:09:58 ] */

import { isString } from 'lmjs/is'

/**
 * Проверка свойства на элементе.
 * 
 * @memberof element
 * @param {string}                   prop Проверяемое свойство.
 * @param {HTMLElement|string} [el='div'] Реальный элемент или строка для создания тестового элемента. По умолчанию 'div'.
 * @param {Function}        [tester=null] Функция тестирования свойства, tester(element.property):boolean
 * @returns {boolean} 
 * @example
 * hasProperty('webkitRequestFullScreen', null, isFunction)
 * // => true
 */
function hasProperty(prop, el = 'div', tester = null) {

  let fixEl = (el instanceof HTMLElement)
    ? el
    : document.createElement(isString(el) ? el : 'div')

  let h = prop in fixEl

  return h
    ? (!tester || tester(fixEl[prop]))
    : false
}

export {
  hasProperty
}
