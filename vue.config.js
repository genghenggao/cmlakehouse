/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-08 23:08:55
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-09 20:58:36
 */
const { defineConfig } = require('@vue/cli-service')
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

//导入cesium
let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        "https": false,
        "zlib": false,
        "http": false,
        "url": false
      }
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(cesiumSource, cesiumWorkers),
            to: 'Workers',
          },
          {
            from: path.join(cesiumSource, 'Assets'),
            to: 'Assets',
          },
          {
            from: path.join(cesiumSource, 'Widgets'),
            to: 'Widgets',
          },
          {
            from: path.join(cesiumSource, 'ThirdParty/Workers'),
            to: 'ThirdParty/Workers',
          },
        ],
      }),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('.././'),
      })],
    module: {
      unknownContextCritical: false
    }
  },
  publicPath: '/',
  // 输出文件目录
  outputDir: 'dist',
  assetsDir: 'static',
  chainWebpack: (config) => {
    // 配置jQuery
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }]);
    config.resolve.symlinks(true) //热更新
  },
})
