const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  // mode: 'production',

  devtool: 'inline-source-map',

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
      title: 'CONQUER WEBPACK V4!',
      inject: 'body',
      template: path.resolve(__dirname, 'index.html')
    })
  ],

  devServer: {
    host: '0.0.0.0',
    port: 8000,
    proxy: {
      '/api/*': 'http://localhost:3000'
    },
    // Enable gzip compression
    compress: true,
    // True for index.html upon 404s, object for multiple paths
    historyApiFallback: true,
    // Inline mode is recommended for Hot Module Replacement as it includes an HMR trigger from the websocket
    inline: true,
    // Hot module replacement. Depends on HotModuleReplacementPlugin
    hot: true,
    // Shows a full-screen overlay in the browser when there are compiler errors or warnings
    overlay: true,
    // filename: 'static/js/bundle.js',
    // CLI custom
    stats: {
      assets: true,           // Sort assets by a field
      children: true,         // Add chunk information
      chunks: false,          // Add built modules information to chunk information
      chunkModules: false,
      colors: true,
      performance: false,     // Show performance hint when file size exceeds `performance.maxAssetSize`
      publicPath: true,       // Add public path information
      version: true,
      hash: true,             // Add the hash of the compilation
      timings: false,
      warnings: false
    }
  }
};
