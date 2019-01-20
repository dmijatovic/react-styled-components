//Node modules
const path = require('path')
const dist = path.resolve(__dirname, '../dist')

//PLUGINS
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

//DEFINITIONS
const optimization = require('./optimization')

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 */
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: dist
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: 'img/[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    //remove all files from dist folder on each build
    //https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin(['*.*'], {
      // Absolute path to root folder (paths appended to this)
      // Default: root of your package
      root: dist,
      // Use boolean "true" to test/emulate delete. (will not remove files).
      // Default: false - remove files
      dry: false,
      // allow the plugin to clean folders outside of the webpack root.
      // Default: false - don't allow clean folder outside of root
      allowExternal: false
    }),
    //copy index html and script bundles
    //https://webpack.js.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    //copy assets
    //https://webpack.js.org/plugins/copy-webpack-plugin/
    new CopyWebpackPlugin([
      //copy all files from assets dir to root
      './static/'
    ]),
    //minify javascript
    new UglifyJSPlugin(),
    /* Bundle Analyzer - further investigation needed
			https://www.npmjs.com/package/webpack-bundle-analyzer
		*/
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle_report.html'
    })
  ],

  /*
		optimize bundels
		https://webpack.js.org/configuration/optimization/
	*/
  optimization: optimization
}
