'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('webpack-html-plugin');
var HasteResolverPlugin = require('haste-resolver-webpack-plugin');

var IP = '0.0.0.0';
var PORT = 3000;
var NODE_ENV = process.env.NODE_ENV;
var ROOT_PATH = path.resolve(__dirname, '..');
var PROD = 'production';
var DEV = 'development';
let isProd = NODE_ENV === 'production';

console.log('ROOT_PATH =', ROOT_PATH)


var config = {
  paths: {
    src: path.join(ROOT_PATH, '.'),
    index: path.join(ROOT_PATH, 'index.web'),
  },
};

module.exports = {
  ip: IP,
  port: PORT,
  devtool: 'source-map',
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    },
    extensions: ['', '.web.js','.js', '.jsx'],
  },
  entry: isProd? [
    config.paths.index
  ]: [
    'webpack-dev-server/client?http://' + IP + ':' + PORT,
    'webpack/hot/only-dev-server',
    config.paths.index,
  ],
  output: {
    path: path.join(__dirname, 'output'),
    filename: 'bundle.js'
  },
  plugins: [
    new HasteResolverPlugin({
      platform: 'web',
      nodeModules: ['react-web']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(isProd? PROD: DEV),
      }
    }),
    isProd? new webpack.ProvidePlugin({
      React: "react"
    }): new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['es2015', 'react', 'stage-2']
      },
      include: [config.paths.src],
      exclude: [/node_modules/]
    }, {
      test: /\.json$/,
      loader: 'json',
    },]
  }
};
