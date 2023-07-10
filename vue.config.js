const resolve = (dir) => require('path').join(__dirname, dir)
const path = require('path')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
// const vantCustomStylePath = require('path').join(
//   __dirname,
//   './src/style/vant-custom.less'
// )

const devPath = 'http://222.189.10.20:8000' // 连云港测试环境
const prodPath = 'http://172.19.198.163:8081'
module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    },
    host: '0.0.0.0',
    port: 8081,
    proxy: {
      '/authApi': {
        target: devPath, // 本地服务环境 authDevPath
        ws: false,
        changeOrigin: true,
        timeout: 0,
        pathRewrite: {
          // '^/authApi': '' // 本地服务环境
          '^/authApi': '/hsa-ltci-auth' // 线上测试环境
        }
      },
      '/hsa-pss-ltci': {
        target: devPath,
        ws: false,
        changeOrigin: true,
        timeout: 0
      }
    }
  },
  assetsDir: 'assets',
  // 工程上下文
  publicPath: '',
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        modifyVars: {
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          // hack: `true; @import "${vantCustomStylePath}";`
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('speed').use(SpeedMeasureWebpackPlugin)
    config.module
      .rule('assets/img')
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        disable: process.env.VUE_APP_ENV === 'development',
        mozjpeg: {
          progressive: true,
          quality: 50
        },
        optipng: {
          enabled: true
        },
        pngquant: {
          quality: [0.5, 0.65],
          speed: 4
        },
        gifsicle: {
          interlaced: false
        }
      })
      .end()
  }
}
