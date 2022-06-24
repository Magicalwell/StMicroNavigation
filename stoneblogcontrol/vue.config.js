module.exports = {
  outputDir: "blogcontrol",
  publicPath: "/child/blogcontrol/",
  productionSourceMap: false,
  devServer: {
    hot: false,
    disableHostCheck: true,
    port: 8081,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  lintOnSave: false,
  // 自定义webpack配置
  configureWebpack: {},
};
