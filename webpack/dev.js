//const webpack = require('webpack');
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

//const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//load stats configuration
const { stats } = require('./stats')
//construct dist folder location
//note: we go up from webpack folder into dist
const dist = path.resolve(__dirname, '../dist')
//console.log("dist...", dist);

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
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
      } /*
			migrated to CSS in JS
			using styled components
		{
			test: /\.(scss|css)$/,
			use: [
				//extract css into separate file
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options:{
						sourceMap: true
					}
				},{
					loader: 'postcss-loader',
					options:{
						sourceMap:true
					}
				},{
					loader: 'sass-loader',
					options:{
						sourceMap: true
					}
				}
			]
		},*/
    ]
  },

  plugins: [
    //copy index html
    //https://webpack.js.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
    //copy static files
    //https://webpack.js.org/plugins/copy-webpack-plugin/
    new CopyWebpackPlugin([
      //copy all files from static dir to root
      //note: when no files folder is not copied!
      './static/'
    ])
  ],
  /**
   * Display stats, see link below for complete list
   * https://webpack.js.org/configuration/stats/#stats
   */
  stats: stats,
  /**
   * Webpack dev server setup
   */
  devtool: 'source-map',
  devServer: {
    port: 3000,
    stats: stats,
    compress: true,
    //route rewrites
    historyApiFallback: true
	},
	// NOT USED IN DEV
  // optimization: {
  //   /*
  //    * SplitChunksPlugin is enabled by default and replaces
  //    * deprecated CommonsChunkPlugin.
  //    * Default configuration has 3 options: all, async or inital
  //    * more info https://webpack.js.org/plugins/split-chunks-plugin/
  //    */
  //   splitChunks: {
  //     // min size 30KB
  //     minSize: 30000,
  //     //max size 1MB
  //     maxSize: 1000000,
  //     cacheGroups: {
  //       vendor: {
  //         name: 'vendor',
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: 'all'
  //       }
  //       /* extract react & react-dom
  //       vendor: {
  //         name: 'react',
  //         test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
  //         chunks: 'all'
  //       }*/
  //     }
  //   }
	// }
}
