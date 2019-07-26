const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const path = require('path')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: '9009'
  },
  devtool: 'source-map'
})
