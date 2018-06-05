const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: {
    main: './src/index.js'
  },

  output: {
    crossOriginLoading: 'anonymous',
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, 'dist', 'A'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: true }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          reduceIdents: false,
          safe: true,
          zindex: false
        }
      })
    ],

    // Create a single manifest file that
    // is shared among all entry points
    runtimeChunk: 'single',

    splitChunks: {
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[id].[contenthash].css'
    })
  ]
};
