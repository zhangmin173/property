/**
 * 生产环境
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('Html-Webpack-Plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlIncludeAssetsPlugin = require('Html-Webpack-include-assets-Plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const utils = require('./base/utils');
const ENV = process.env.NODE_ENV;
const conf = require('./base/conf')[ENV];
const dir = require('./base/dir');
const webpackBaseConf = require('./base.conf');

const webpackConfig = merge(webpackBaseConf,{
  plugins: [
    new CleanWebpackPlugin(dir.dist, {
      root: dir.root,
      verbose: false,
      dry: false
    }),
    // new CleanWebpackPlugin(dir.dll, {
    //   root: dir.root,
    //   verbose: false,
    //   dry: false
    // }),
    // new webpack.DllReferencePlugin({
    //   context: dir.root, // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
    //   manifest: require(path.join(dir.dll,'dll.manifest.json')), // 指定manifest.json
    //   name: 'dll',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    // }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash:8].css'
    }),
    new webpack.HashedModuleIdsPlugin() // 用在生产模式
  ]
});
module.exports = webpackConfig;