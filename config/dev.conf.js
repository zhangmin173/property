/**
 * 开发环境
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConf = require('./base.conf');
const MyPlugin = require('../webpack/plugins/htmlWebpackPlugin');

const utils = require('./base/utils');
const ENV = process.env.NODE_ENV;
const conf = require('./base/conf')[ENV];

Object.keys(webpackBaseConf.entry).forEach(function(name){
  webpackBaseConf.entry[name] = ['webpack-hot-middleware/client?reload=true'].concat(webpackBaseConf.entry[name]);
});
const webpackConfig = merge(webpackBaseConf,{
  devtool: 'eval-source-map',
  plugins: [
    // new MyPlugin({
    //     paths: ["./configuration/config.js"]
    // }),
    new webpack.NoEmitOnErrorsPlugin(), // 报错停止编译
    new webpack.HotModuleReplacementPlugin(), // 热更新模块
    new webpack.NamedModulesPlugin() // 更新组件时在控制台输出组件的路径而不是数字ID，用在开发模式
  ]
});

module.exports = webpackConfig;