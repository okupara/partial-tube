const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const path = require('path')
const firebaseConfig = require('./firebase.dev.config.json')
const youtubeConfig = require('./youtube.config.json')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: '9009'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.FIREBASE_CONFIG': JSON.stringify(firebaseConfig),
      'process.env.YOUTUBE': youtubeConfig.key ? youtubeConfig.key : ''
    })
  ],
  devtool: 'source-map'
})
