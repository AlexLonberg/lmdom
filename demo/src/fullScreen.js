/* fullScreen.js [ 01.05.2020 : 01:31:41 ] */

import { fullScreen } from 'lmdom/element'

const el = document.getElementById('fs')
let efs = fullScreen(el, (isFullScreen) => {
  console.log('isFullScreen', isFullScreen)
})

el.addEventListener('dblclick', () => {
  if (efs.is()) {
    efs.off()
  } else {
    efs.on()
  }
})
