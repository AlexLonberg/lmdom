/* hasProperty.js [ 03.05.2020 : 04:18:23 ] */

import { isFunction } from 'lmjs/is'
import { hasProperty } from 'lmdom/element'

console.log(
  'Наличие метода webkitRequestFullScreen: ',
  hasProperty('webkitRequestFullScreen', null, isFunction)
)

console.log(
  'Наличие свойства errorProperty: ',
  hasProperty('errorProperty')
)
