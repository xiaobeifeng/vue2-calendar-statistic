/**
 * 由于 Vue CLI 3 不再使用传统的 webpack 配置文件，故 WebStorm 无法识别别名
 * 本文件对项目无任何作用，仅作为 WebStorm 识别别名用
 * 进入 WebStorm preferences -> Language & Framework -> JavaScript -> Webpack，选择这个文件
 * 无需重启IDA即可生效
 * */
const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  resolve: {
    alias: {
      '@/configs': resolve('src/configs'),
      '@/assets': resolve('src/assets'),
      '@/framework': resolve('src/framework'),
      '@/layout': resolve('src/layout'),
      '@/store': resolve('src/store'),
      '@/router': resolve('src/router'),
      '@/init': resolve('src/init'),
      '@/utils': resolve('src/utils'),
      '@/common': resolve('src/common'),
      '@/app.config': resolve('src/app.config'),
      '@/modules': resolve('src/modules'),
      '@/service': resolve('src/service'),
      '@/service-third': resolve('src/service-third')
    }
  }
}
