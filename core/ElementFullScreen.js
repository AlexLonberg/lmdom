/* ElementFullScreen.js [ 01.05.2020 : 01:01:39 ] */

import { isFunction } from 'lmjs/is'
import { hasProperty } from './ElementHasProperty.js'

// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
const [requestFullScreen, exit, fullscreenElement, event, eventTarget] = (() => {
  let fixEl = document.createElement('div')
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen
  let rfs
  for (let i of [
    'requestFullScreen',
    'webkitRequestFullScreen',
    'mozRequestFullScreen',
    'msRequestFullscreen'
  ]) {
    if (hasProperty(i, fixEl, isFunction)) {
      rfs = i
      break
    }
  }
  // https://developer.mozilla.org/ru/docs/Web/API/Document/exitFullscreen
  let exit
  for (let i of [
    'exitFullscreen',
    'cancelFullScreen',
    'webkitCancelFullScreen',
    'mozCancelFullScreen',
    // У IE11 буква s(screen) маленькая в отличие от других
    'msExitFullscreen'
  ]) {
    if ((i in document) && isFunction(document[i])) {
      exit = i
      break
    }
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/fullscreenElement
  let fse
  for (let i of [
    'fullscreenElement',
    'webkitFullscreenElement',
    'mozFullScreenElement',
    'msExitFullscreenElement'
  ]) {
    if (i in document) {
      fse = i
      break
    }
  }

  if (!rfs || !exit || !fse) {
    return []
  }

  exit = document[exit].bind(document)
  let cfse = () => document[fse]

  switch (rfs) {
    case 'requestFullScreen':
      return [rfs, exit, cfse, 'fullscreenchange', null]
    case 'webkitRequestFullScreen':
      return [rfs, exit, cfse, 'webkitfullscreenchange', null]
    // мозила и internet explorer не поддерживает событие на элементе
    case 'mozRequestFullScreen':
      return [rfs, exit, cfse, 'mozfullscreenchange', document]
    case 'msRequestFullscreen':
      return [rfs, exit, cfse, 'MSFullscreenChange', document]
  }
})()

/**
 * Тест перехода в полноэкранный режим и установка методов
 * 
 * @private
 * @memberof core
 */
function elementTestFullScreen() {
  return { requestFullScreen, exit, fullscreenElement, event, eventTarget }
}

export {
  elementTestFullScreen
}
