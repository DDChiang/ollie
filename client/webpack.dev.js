// THIS IS LOCAL VERSION (not necessarily "dev")

const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(commonConfig, {
  // https://webpack.github.io/docs/configuration.html#devtool
  // devtool: 'eval-cheap-module-source-map',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            // for writing files to disk (for local development use only)
            loader: 'cache-loader',
            options: {
              // provide a cache directory where cache items should be stored
              cacheDirectory: path.resolve('.cache')
            }
          },
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable HMR
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        HAS_REDUX_DEV_TOOLS: true
      },
    })
  ],
  devServer: {
    port: 1888,
    historyApiFallback: true,
    hot: true, // Tell dev server we're using HMR
    contentBase: path.join(__dirname, './src'),
    // publicPath: '/',
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: true,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      }
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        sercure: false
      }
    }
  }
});
