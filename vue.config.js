"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        config: path.resolve(__dirname, "../src/config"),
      },
    },
  },
  chainWebpack(config) {
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
  devServer: {
    proxy: {
      // "/prod-api": {
      //   // target: "http://59.36.239.170:28089",
      //   // target: "http://61.136.101.78:28089",
      //   // target: "http://sztoosun.com:28089",
      //   // target: "http://123.60.106.110:28089",
      //   // target: "http://222.82.236.242:28089",
      //   // target: "http://www.zkgt-safety.com:28089",
      //   // target: "http://58.144.142.198:28089",
      //   // target: "http://xzs.rybsj.cn:28089",
      //   // target: "http://47.112.100.126:28089",
      //   target: "http://125.64.5.2:28089",
      //   // target: "http://103.47.83.154:28089",
      //   // target: "http://183.57.73.73:28089",
      //   // target: "http://150.138.133.178:28089",
      //   // target: "http://103.44.239.96:28089",
      //   // target: "http://157.255.57.82:28089",
      //   // target: "http://119.120.92.235:28089",
      //   // target: "http://59.36.239.104:28089",
      //   // target: "http://120.77.26.39:28089",
      //   // target: "http://219.151.22.47:28089",
      //   // target: "http://120.78.76.65:28089",
      //   // target: "http://220.197.15.174:28089",
      //   // target: "http://220.197.15.57:28089",
      //   // target: "http://120.78.135.169:28089",
      //   // target: "http://120.78.76.65:28089",
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/prod-api": "/prod-api",
      //   },
      // },
      "/previewapi": {
        target: "http://125.64.5.2:8204",
        ws: true,
        pathRewrite: {
          "^/previewapi": "",
        },
      },
      "/": {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
      },
    },
  },
};
