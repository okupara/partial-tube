const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  // entry: ["@babel/polyfill", "./src/index.tsx"], <- doesn't reduce js file size...
  output: {
    path: path.join(path.resolve(), 'hosting'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(process.cwd(), 'src', 'index.html')
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      components: path.resolve('./src/components'),
      containers: path.resolve('./src/containers'),
      context: path.resolve('./src/context'),
      hooks: path.resolve('./src/hooks'),
      apollo: path.resolve('./src/apollo'),
      utils: path.resolve('./src/utils'),
      __mocks__: path.resolve('./src/__mocks__')
    }
  }
}
