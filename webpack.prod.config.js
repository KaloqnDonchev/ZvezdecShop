const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'web',
  devtool: '#source-map',
  // Webpack 4 does not have a CSS minifier, although
  // Webpack 5 will likely come with one
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      })
    ]
  },
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        // Loads images into CSS and Javascript files
        test: /\.jpg$/,
        use: [{loader: 'url-loader'}]
      }
    ]
  },
  plugins: [
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