module.exports = {
  publicPath: process.env.BASE_URL,
  productionSourceMap: false,
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:8888",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/api": "",
  //       },
  //     },
  //   },
  // },
};
