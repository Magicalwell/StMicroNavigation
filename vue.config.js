// const path = require('path')
module.exports = {
  outputDir: 'main-app',
  publicPath: '/main-app/',
  productionSourceMap: false,
  devServer: {
    hot: false,
    disableHostCheck: true,
    open: true,
    port: 3000,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  lintOnSave: false,
  // 自定义webpack配置
  configureWebpack: {
    output: {
      jsonpFunction: 'webpackJsonp-main-vue3'
    }
  },
  resolve: {
    alias: [
      {
        '@': 'src'
      }
    ]
  },
  chainWebpack: (config) => {
    // config.resolve.alias.set("@micro-zoe/micro-app", path.join(__dirname, '../../../micro-app/lib/index.esm.js'))

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: (tag) => /^micro-app/.test(tag)
        }
        return options
      })
  }
}
