const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',

  entry: [
    'babel-polyfill',           // polyfill by babel
    'react-hot-loader/patch',   // react hot loader v3 -> used with webpack HMR
    'webpack-dev-server/client?http://localhost:8000',     // websocket으로 감지
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src/index.js')
  ],

  output: {
    path: path.resolve(__dirname, 'build'),
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        // use: [
        //   'babel-loader'
        // ],
        loader: 'babel-loader',
        exclude: [/node_modules/],
        // options를 사용하려면 위의 loader 방식을 사용해야함
        // options: {
        //   presets: ['es2015', 'react']
        // }
        options: {
          cacheDirectory: true,
          // plugins: [
          //   'react-hot-loader/babel'
          // ]
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      { // 이미지 파일들을 import하면 output directory로의 path값을 갖도록 한다
        test: /\.(png|svg|jpg|gif)$/,
        use: [
         'file-loader'
        ]
      },
      { // 폰트 파일들도 이미지와 마찬가지로 연결
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
         'file-loader'
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['build']),
    // This is especially useful for webpack bundles that include a hash in the filename which changes every compilation.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/index.html')
    }),
    // Use HMR
    new webpack.HotModuleReplacementPlugin(),
    // HRM update 때마다 브라우저 콘솔에 나오는 모듈 이름을 단순하게 표현
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({   // minify the size of bundle.js
      sourceMap: true,
      compressor: {
        warnings: false
      }
    })
  ],

  devServer: {
    host: 'localhost',
    port: 8000,
    proxy: {
      '/api/*': 'http://localhost:3000'
    },
    // contentBase: path.join(__dirname, 'dist'),
    compress: true,   // enable gzip compression
    historyApiFallback: true,   // true for index.html upon 404s, object for multiple paths
    inline: true, // Inline mode is recommended for Hot Module Replacement as it includes an HMR trigger from the websocket
    hot: true,    // hot module replacement. Depends on HotModuleReplacementPlugin -> enable HMR on the SERVER!!
    overlay: true,  // Shows a full-screen overlay in the browser when there are compiler errors or warnings
    filename: 'static/js/bundle.js',
    stats: {                       // cli custom
      assets: true,           // Sort assets by a field
      children: true,         // Add chunk information
      chunks: false,          // Add built modules information to chunk information
      chunkModules: false,
      colors: true,
      performance: true,      // Show performance hint when file size exceeds `performance.maxAssetSize`
      publicPath: true,       // Add public path information
      version: true,
      hash: true,             // Add the hash of the compilation
      timings: false,
      warnings: false
    }
  },

  performance: { // performance tuning에 대한 힌트를 표시한다
    hints: false
  },
};
