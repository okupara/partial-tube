const path = require('path')
const baseConfig = require('../webpack.config.base')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader')
    // options: {
    //   presets: [['react-app', { flow: false, typescript: true }]]
    // }
  })
  config.externals = {
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true
  }
  config.node = { fs: 'empty' }
  config.resolve.extensions.push('.ts', '.tsx')

  config.resolve.alias = baseConfig.resolve.alias

  delete config.resolve.alias['core-js']
  return config
}
