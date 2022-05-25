'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'config': path.resolve(__dirname, '../src/config')
      }
    }
  },
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  devServer: {
    proxy: {
      "/prod-api": {
        // target: "http://59.36.239.170:28089",
        // target: "http://61.136.101.78:28089",
        // target: "http://sztoosun.com:28089",
        // target: "http://222.82.236.242:28089",
        // target: "http://www.zkgt-safety.com:28089",
        target: "http://58.144.142.198:28089",
        // target: "http://183.57.73.73:28089",
        // target: "http://150.138.133.178:28089",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/prod-api": "/prod-api",
        },
      },
      '/': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true
      },
    }
  }
}