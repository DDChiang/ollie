const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const PREFIX_STATIC_PATH = process.env.PREFIX_STATIC_PATH || './';

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    app: './index.js' // somehow this needs ./ prefix
  },
  output: {
    // path: path.resolve(__dirname, 'dist'),
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    // sourceMapFilename: '[name].map',
    // publicPath: PREFIX_STATIC_PATH
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
            }
          ]
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2000
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // somehow this does NOT need ./ prefix
      title: 'Test App Title'
    }),
    new ExtractTextPlugin('[name]-[contentHash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[hash].min.js',
      minChunks: (module) => {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    })
  ]
};
