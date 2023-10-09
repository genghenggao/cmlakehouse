/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2023-10-08 23:08:55
 * @LastEditors: henggao
 * @LastEditTime: 2023-10-09 16:44:20
 */
const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: true,
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
