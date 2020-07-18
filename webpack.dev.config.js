const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  entry: {
    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  mode: 'development',
  target: 'web',
  devtool: '#source-map',
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarning: true,
          failOnError: false,
          failOnWarning: false
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
       test: /\.(png|svg|jpg|gif)$/,
       use: ['file-loader']
      }
    ]
  },
  plugins: [
    new WebpackShellPlugin({onBuildEnd: ['nodemon dist/app.js']}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve('src/webpages/'), to: 'webpages', toType: 'dir' },
        { from: path.resolve('src/img/'), to: 'img', toType: 'dir' },
        { from: path.resolve('.env'), to: '.env', toType: 'file' },
        { from: path.resolve('src/app.js'), to: 'app.js', toType: 'file' },
        { from: path.resolve('src/css/style.css'), to: 'css/style.css', toType: 'file' }
      ],
    }),
  ]
}