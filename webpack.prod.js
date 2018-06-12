/* eslint import/no-extraneous-dependencies: 0 */
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: "./client/index.jsx",
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      DEBUG: false
    }),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "TimeTracker App",
      template: "assets/template.html",
      favicon: "assets/favicon.png"
    }),
    new UglifyJSPlugin({
      sourceMap: true
    })
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      // handling our stylus files
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js", "json", "css", "sass"]
  }
};
