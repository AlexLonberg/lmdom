/* demo.config.js [ 01.05.2020 : 01:26:14 ] */

import resolve from '@rollup/plugin-node-resolve'

export default {
  input: [
    // 'demo/src/fullScreen.js',
    'demo/src/hasProperty.js'
  ],
  output: {
    format: 'iife',
    dir: 'demo/dist/',
    strict: true,
    sourcemap: true
  },
  plugins: [
    resolve()
  ]
}
