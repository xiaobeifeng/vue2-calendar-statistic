/*
 * @Version: 1.0
 * @Author: zhanghe
 * @Date: 2021-04-06 13:27:37
 * @LastEditors: zhanghe
 * @LastEditTime: 2021-06-06 19:25:41
 * @Description:
 */
const plugins = []
if (process.env.NODE_ENV === 'production') {
  // plugins.push('transform-remove-console') // 去掉console
}
module.exports = {
  env: {
    debug: {
      sourceMap: true,
      retainLines: true
    }
  },
  presets: [
    [
      '@vue/app',
      {
        debug: false,
        polyfills: [
          'es6.promise',
          'es6.array.find-index',
          'es7.array.includes',
          'es6.string.includes'
        ]
        // 项目中用到的polyfill
      }
    ]
  ],
  plugins
}
