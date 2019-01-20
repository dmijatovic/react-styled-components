/*
  OPTIMIZATION
  this object is assigned to optimization prop of production configuration
  for more information about optimizing webpack bundels
  https://webpack.js.org/configuration/optimization/
*/

module.exports = {
  /*
   * SplitChunksPlugin is enabled by default and replaces
   * deprecated CommonsChunkPlugin.
   * Default configuration has 3 options: all, async or inital
   * more info https://webpack.js.org/plugins/split-chunks-plugin/
   */
  splitChunks: {
    // min size 30KB
    minSize: 30000,
    //max size 500KB
    maxSize: 500000,
    cacheGroups: {
      // extract all vendors
      vendor: {
        name: 'vendor',
        test: /[\\/]node_modules[\\/]/,
        chunks: 'all'
      }
      /* extract react & react-dom
      vendor: {
        name: 'react',
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        chunks: 'all'
      }*/
    }
  }
}
