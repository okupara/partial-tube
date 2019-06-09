const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  // entry: ["@babel/polyfill", "./src/index.tsx"], <- doesn't reduce js file size...
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(process.cwd(), "public", "index.html")
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  }
}
