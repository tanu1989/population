const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  context: path.resolve(__dirname, 'src'),

    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './index.jsx'
    ],

  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "index.js",
  },
  
  resolve: {
      extensions: ['.js', '.json', '.jsx'],
  },

  module: {
      rules: [
          // JS Loader
          {
              test: /\.jsx?$/,
              use: {
                  loader: 'babel-loader'
              },
              exclude: '/node_modules/',
              include: [path.join(__dirname, 'src')]
          }
      ]
  },
  plugins: [HtmlWebpackPluginConfig,  new webpack.HotModuleReplacementPlugin()]
}