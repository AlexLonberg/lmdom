/* fullScreen.js [ 01.05.2020 : 00:59:10 ] */

import { elementTestFullScreen } from '../core/ElementFullScreen.js'
import { isFunction } from 'lmjs/is'


/**
 * Возвращает интерфейс перехода в полноэкранный режим для элемента HTML.
 * 
 * @memberof element
 * @param {HTMLElement}           el HTMLElement.
 * @param {Function} [listener=null] callBack для события fullscreenchange.
 * @returns {{
 *   is:Function,
 *   fullscreenElement:Function,
 *   on:Function,
 *   off:Function,
 *   add:Function,
 *   remove:Function,
 *   destroy:Function
 * }} 
 * @example
 * const fse = fullScreen(el, (isFullScreen)=>console.log(isFullScreen))
 * fse.on()
 * // console.log => true
 * fse.off()
 * // console.log => false
 */
function fullScreen(el, listener = null) {
  let { requestFullScreen, exit, fullscreenElement, event, eventTarget } = elementTestFullScreen()
  if (!requestFullScreen) {
    throw new Error(`Браузер не поддерживает перехода элемента в полноэкранный режим`)
  }

  requestFullScreen = el[requestFullScreen].bind(el)
  // Некоторые браузеры используют document для установки событий
  if (!eventTarget) {
    eventTarget = el
  }
  let isev = false
  let listeners = []
  const is = () => {
    return fullscreenElement() === el
  }
  const callBack = () => {
    let cb
    let ce = is()
    for (cb of listeners) {
      cb(ce)
    }
  }
  const add = (l) => {
    if (!isFunction(l) || listeners.includes(l)) {
      return
    }
    listeners.push(l)

    if (!isev) {
      isev = true
      eventTarget.addEventListener(event, callBack)
    }
  }
  const remove = (l) => {
    let i = listeners.indexOf(l)
    if (i === -1) {
      return
    }
    listeners.splice(i, 1)
    if (isev && !listeners.length) {
      isev = false
      eventTarget.removeEventListener(event, callBack)
    }
  }

  if (isFunction(listener)) {
    add(listener)
  }

  return {
    is,
    fullscreenElement,
    on() {
      if (!fullscreenElement()) {
        requestFullScreen()
      }
    },
    off() {
      if (fullscreenElement() === el) {
        exit()
      }
    },
    add,
    remove,
    // Удаляет слушателей и затирает ссылки без возможности восстановления
    destroy() {
      if (listeners.splice(0).length) {
        if (isev) {
          isev = false
          eventTarget.removeEventListener(event, callBack)
        }
      }
      el = eventTarget = null
    }
  }
}

export default fullScreen
