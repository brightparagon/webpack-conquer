const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const ManifestPlugin = require('webpack-manifest-plugin'); // for Android
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin'); // for Service Worker

module.exports = {
  /*
    에러 발생시 production 컴파일을 중단한다.
  */
  bail: true,

  /*
    Production에서는 빌드가 오래 걸리더라도 source-map 설정을 하는 것이
    정확히 어느 코드에서 에러가 발생했는지 알 수 있기 때문에 디버깅에 유용하다.
    아래는 production에서 사용할 수 있는 devtool 종류와 그에 대한 설명이다.
    webserver에 build 폴더를 배포할때 source map 파일을 올리지 않는다.

    source-map: A full SourceMap is emitted as a separate file.
                It adds a reference comment to the bundle so development
                tools know where to find it.
                You should configure your server to disallow access to
                the Source Map file for normal users!
    hidden-source-map: Same as source-map, but doesn't add a reference
                       comment to the bundle. Useful if you only want SourceMaps
                       to map error stack traces from error reports, but don't
                       want to expose your SourceMap for the browser development tools.
                       You should not deploy the Source Map file to the webserver.
                       Instead only use it for error report tooling.
    nosources-source-map: A SourceMap is created without the sourcesContent
                          in it. It can be used to map stack traces on the
                          client without exposing all of the source code.
                          You can deploy the Source Map file to the webserver.
                          It still exposes filenames and structure for decompiling,
                          but it doesn't expose the original code.
  */
  devtool: 'hidden-source-map',

  /*
    필요한 파일들을 최종적으로 묶어서 entry의 파일들로 만든다.
    아래의 경우는 vender.hash.js와 app.hash.js 두개의 파일로 번들링된다.
  */
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router-dom'
    ],
    app: path.resolve(__dirname, 'src/index.js')
  },

  /*
    output 부분이 매우 혼동스러운 점이 많다.
    path: 번들링된 파일들이 위치할 경로이다. 지금은 프로젝트 루트 경로의 build 폴더이다.
    filename: 번들링된 하나 혹은 여러개의 최종 파일들의 이름을 정한다.
              이 이름대로 index.html에 script 태그로 삽입된다.
    chunkFilename: code-splitting을 하는 경우 entry에 포함되지 않은 파일들이 이 규칙대로 명명된다.
    publicPath: 번들링된 파일이 어디에서 serve될지를 정하는 경로이다.
                보통 서버에서 serve되므로 '/'로 설정한다.
  */
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        // exclude: [/node_modules/],
        options: {
          compact: true
        }
      },

      /*
        ExtractTextPlugin 플러그인은 프로젝트의 css 파일들을
        하나의 css 파일로 만들어(추출) index.html에 script tag로 삽입한다.
        주의할 점: development의 css 로딩 방식과 production의 그것이 서로 다르면
        개발할때와 빌드되었을때의 결과물이 서로 다를 수 있으므로 로딩 규칙을 정확히 숙지해야한다.
      */
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true
              }
            }
          ]
        })
      },

      /*
        test 정규식에 있는 종류의 파일들을 url-loader로 번들링한다.
        file-loader와 다른 점은 options에 limit 설정을 부여하면
        해당 바이트를 초과하는 파일은 base64로 인코딩을 해서
        name에 설정된 이름으로 파일을 만든다.
      */
      {
        test: /\.(png|jpg|jpeg|bmp|ico|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
          limit: 10000
        }
      },

      /*
        이 file-loader가 가장 아래에 있고 test 정규식이 없는 이유는
        위 loader들에서 processed되지 않은 종류의 파일이 있다면
        build 폴더로 최종적으로 번들링되어 위치시키기 위함이다.
        예를 들면, 비디오 파일이나 문서 파일 등이 이에 해당할 수 있으며
        build/static/media/ 경로에 저장된다.
        아래는 create-react-app의 webpack production의 설명이다.
        // "file" loader makes sure assets end up in the `build` folder.
        // When you `import` an asset, you get its filename.
        // This loader doesn't use a "test" so it will catch all modules
        // that fall through the other loaders.
      */
      // {
      //   loader: 'file-loader',
      //   exclude: [/\.js$/, /\.html$/, /\.json$/, /\.css$/],
      //   options: {
      //     name: 'static/media/[name].[hash:8].[ext]'
      //   }
      // }
    ]
  },

  plugins: [
    /*
      build 폴더를 컴파일 할때마다 삭제한다. 삭제하지 않고 HtmlWebpackPlugin만
      사용할 경우 index.html 파일을 덮어씌우기만 하는데 이럴 경우
      기존 번들링 파일에서 지워진 부분이 있을 경우 build 폴더에 계속 남게되어
      예기치 않은 문제가 발생할 수 있다.
    */
    new CleanWebpackPlugin(['build']),

    /*
      컴파일(번들링) 할때마다 index.html을 새로 생성한다. 이때 사용되는 html 파일은
      처음 서버에서 제공되는 public 폴더 내의 index.html이고 이를 템플릿으로 사용하여
      script를 inject한다. minify옵션을 주어서 공백 및 개행문자 등을 제거하여
      파일 크기를 줄여서 index.html 파일을 만들어 build 폴더에 저장한다.
    */
    new HtmlWebpackPlugin({
      title: 'Production',
      template: path.resolve(__dirname, 'public/index.html'),
      inject: true,
      hash: true,
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

    /*
      pages 폴더의 파일들이 곧 앱의 페이지들인데, production에서는
      이 페이지들을 초기 로딩에서 전부 가져오는 것보다 페이지 진입시
      lazy하게 import하는 것이 자원관리 측면에 있어서 효율적이다.
      따라서 기본적으로 사용했던 index.js를 production일 경우
      index.async.js로 치환함으로써 production에서만 lazy import를 사용한다.
    */
    new webpack.NormalModuleReplacementPlugin(
      /pages\/index\.js/,
      './index.async.js'
    ),

    new webpack.HashedModuleIdsPlugin(),

    /*
      entry에서 지정했던 공통적으로 사용되는 라이브러리를 하나의 청크로 묶는다.
    */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    
    /*
      entry에 명시되지 않은 나머지 파일을 청크로 나눈다.
      이렇게 청크로 나누게 되면 각 번들링된 파일들을 parallel로 부르기 때문에
      앱의 첫 로딩 속도가 개선된다.
    */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),

    /*
      ExtractTextPlugin을 사용한다.
    */
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      allChunks: true
    }),

    /*
      webpack이 번들링할때 NODE_ENV 환경변수를 production으로 노출함으로써
      의존 라이브러리들에서 불필요한 파일 및 코드들을 제외시킨다.
      Many libraries will key off the process.env.NODE_ENV variable to determine
      what should be included in the library. For example, when not in production
      some libraries may add additional logging and testing to make debugging easier.
      However, with process.env.NODE_ENV === 'production' they might drop or add
      significant portions of code to optimize how things run for your actual users.
      We can use webpack's built in DefinePlugin to define this variable
      for all our dependencies
    */
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    /*
      webpack이 변환하는 JavaScript 파일의 크기를 줄여준다.
      webpack v3 에서부터 지원한다.
    */
    new webpack.optimize.ModuleConcatenationPlugin(),

    /*
      UglifyJSPlugin을 이용해서 프로젝트를 tree shaking한다.
      JavaScript 라이브러리와 프로젝트의 JavaScript 파일을 번들링하기 전에
      ES6의 import와 export 구문을 추적하여 export 되었지만 어딘가에서
      import하지 않아 최종적으로 exported되지 않은 파일들(일명 dead code)을
      번들링된 파일에서 drop한다. 이를 dead code elimination이라 한다.
      참고로 이 플로그인은 cheap-source-map에서 작동하지 않는다.

      production bundling에서 대부분의 효율성은
      webpack.DefinePlugin 플러그인과 UglifyJSPlugin 플러그인에서 나온다.
      프로젝트의 대부분의 비중을 JavaScript 파일이 차지하고 있기 때문이다.
      이 설정으로 번들링된 파일들의 사이즈를 보면 development 설정일때와 비교했을때
      매우 작아진 것을 확인할 수 있다.
    */
    new UglifyJSPlugin({
      sourceMap: true,
      parallel: true,
      uglifyOptions: {
        ie8: false,
        mangle: true,
        compress: true,
        warnings: false
      }
    })
  ]
};
