const path = require('path')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]]
    }
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

  // alias can be added whenever I want, if it would be much more, I should create a helper function.
  config.resolve.alias['components'] = path.resolve(
    __dirname,
    '../src/components'
  )
  //
  console.log('DEBUG', config.resolve.alias)
  delete config.resolve.alias['core-js']
  return config
}
