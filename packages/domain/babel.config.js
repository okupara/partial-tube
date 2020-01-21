module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: ['last 2 versions', 'not dead', 'not < 2%', 'not ie 11'],
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true }
      }
    ],
    ['@babel/preset-typescript', { allowNamespaces: true }]
  ]
}
