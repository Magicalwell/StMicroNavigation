module.exports = {
  outputDir: 'vue3',
  publicPath: '/testmicro/',
  productionSourceMap: false,
  devServer: {
    hot: false,
    disableHostCheck: true,
    port: 3001,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  lintOnSave: false,
  // 自定义webpack配置
  configureWebpack: {}
}
