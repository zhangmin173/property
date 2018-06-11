/**
 * webpack基础配置
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('Html-Webpack-Plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const utils = require('./base/utils');
const ENV = process.env.NODE_ENV;
const conf = require('./base/conf')[ENV];
const dir = require('./base/dir');


const entries = utils.getEntry('**/index.js', dir.pages);

const coms = {
  'common/base': path.join(__dirname, '../src/common/js/base.js'),
}
for (const key in coms) {
  if (coms.hasOwnProperty(key)) {
    entries[key] = coms[key];
  }
}

module.exports = {
  entry: entries,
  output: {
    path: dir.dist,
    filename: conf.filename,
    publicPath: conf.publicPath,
  },
  resolve: {
    alias: {
      'src': path.join(__dirname, '../src')
    }
  },
  stats: "errors-only",
  mode: conf.mode,
  plugins: utils.getPage('**/index.html', dir.pages),
  module: require('./base/module.conf')[ENV]
};