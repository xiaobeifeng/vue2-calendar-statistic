/*
 * @Author: ARAN
 * @Date: 2021-03-08 15:35:11
 * @LastEditors: ARAN
 * @LastEditTime: 2021-08-02 18:02:25
 * @Description: postcss适配方式，px2rem
 */
module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 144, // 结果为：设计稿元素尺寸/75，设计稿宽 750,最终页面会换算成 10rem
      // unitPrecision: 5, // 允许REM单位增长的十进制数
      propList: ['*'],
      // selectorBlackList: [""],
      // （数组）要忽略的选择器并保留为px。
      minPixelValue: 2 // （数字）设置要替换的最小像素值 解决 1px 问题    }
    }
  }
}
