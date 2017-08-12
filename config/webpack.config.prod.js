const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const paths = require('./paths');

module.exports = {
  devtool: 'source-map',

  entry: [paths.app],

  output: {
    filename: '[name].[chunkhash].js',
    path: paths.output,
    publicPath: paths.public
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: paths.source
      },
      {
        test: /\.svg$/,
        loaders: ['babel-loader', 'react-svg-loader'],
        include: paths.assets
      },
      {
        test: /\.css/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&localIdentName=[path][name]--[local]--[hash:base64:5]',
            'postcss-loader'
          ]
        }),

        include: paths.source
      },
      {
        test: /\.(woff|png|jpg|gif)$/,
        loader: 'url-loader?limit=5000'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      __PRODUCTION__: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module =>
        module.context && module.context.includes('node_modules')
    }),
    new HtmlWebpackPlugin({
      title: 'React Battleship',
      template: paths.template
    }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { screw_ie8: true, warnings: false },
      mangle: { screw_ie8: true }
    }),
    new OfflinePlugin({
      caches: {
        main: ['main.*.js', 'main.*.css', 'vendor.*.js'],
        optional: [':rest:']
      },
      AppCache: false
    })
  ]
};
