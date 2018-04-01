const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'app.js'),
    bar: path.resolve(__dirname, 'src', 'bar.js')
  },
  
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },

  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      title: 'CONQUER WEBPACK V3!'
    })
  ]
};