module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: ['last 2 versions', 'not dead', 'not < 2%', 'not ie 11'],
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    ['@babel/preset-typescript', { allowNamespaces: true }],
    '@babel/preset-react'
  ],
  plugins: [
    // [
    //   '@babel/plugin-transform-runtime',
    //   {
    //     regenerator: true
    //   }
    // ],
    '@babel/plugin-proposal-class-properties',
    // 'react-hot-loader/babel',
    '@babel/plugin-syntax-dynamic-import'
  ],
  // env: {
  //   test: {
  //     presets: ['@babel/preset-env'],
  //     plugins: ['dynamic-import-node']
  //   }
  // }
}
