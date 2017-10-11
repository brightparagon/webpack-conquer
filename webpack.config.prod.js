const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const ManifestPlugin = require('webpack-manifest-plugin');
// const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
// const eslintFormatter = require('react-dev-utils/eslintFormatter');
// const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = {
  bail: true,
  devtool: 'cheap-module-eval-source-map',

  // In production, we only want to load the polyfills and the app code.
  // entry: [require.resolve('./polyfills'), paths.appIndexJs],
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router-dom'
    ],
    app: path.resolve(__dirname, 'src/index.js')
  },

  output: {
    // The build folder.
    path: path.resolve(__dirname, 'build'),
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        exclude: [/node_modules/],
        options: {
          compact: true
        }
      },
      {
        // extract-text-webpack-plugin 사용
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000
          // name: 'static/media/[name].[hash:8].[ext]',
        }
      },
      {
        loader: 'file-loader',
        exclude: [/\.js$/, /\.html$/, /\.json$/]
        // options: {
        //   name: 'static/media/[name].[hash:8].[ext]',
        // },
      }
    ]
  },

  plugins: [
    // new webpack.NormalModuleReplacementPlugin(
    //   /pages\/index\.js/,
    //   './index.async.js'
    // ),
    new webpack.NormalModuleReplacementPlugin(
      /^pages$/,
      'pages/index.async.js'
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),

    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    // new webpack.DefinePlugin(env.stringified),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true
      },
      sourceMap: true
    })

    // // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    // new ExtractTextPlugin({
    //   filename: cssFilename,
    // })
  ]
};
