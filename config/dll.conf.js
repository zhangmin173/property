const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const utils = require('./base/utils');
const ENV = process.env.NODE_ENV;
const conf = require('./base/conf')[ENV];
const dir = require('./base/dir');

module.exports = {
  entry: {
    /*
      指定需要打包的js模块
      或是css/less/图片/字体文件等资源，但注意要在module参数配置好相应的loader
    */
    dll: [
      path.join(__dirname,'../libs/lib-zepto/1.0.0/zepto.min.js'),
    ],
  },
  mode: conf.mode,
  output: {
    path: path.resolve(__dirname, '../src/dll'),
    filename: '[name].js',
    library: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
  },
  plugins: [
    new CleanWebpackPlugin(dir.dll, {
      root: dir.root,
      verbose: false,
      dry: false
    }),
    new webpack.DllPlugin({
      path: path.join(dir.dll,'dll.manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
      context: dir.root, // 指定一个路径作为上下文环境，需要与DllReferencePlugin的context参数保持一致，建议统一设置为项目根目录
    }),
    /* 跟业务代码一样，该兼容的还是得兼容 */
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    //   'window.jQuery': 'jquery',
    //   'window.$': 'jquery',
    // }),
    new ExtractTextPlugin('[name].css'), // 打包css/less的时候会用到ExtractTextPlugin
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [require('autoprefixer')({
                  browsers: ['last 2 versions', 'Android >= 4.0', 'iOS 7'],
                  remove: true,
                })]
              }
            },
            {
              loader: 'less-loader'
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100,
              name: '[name].[ext]',
              publicPath: conf.assets.publicPath,
              outputPath: conf.assets.outputPath
            }
          },
        ]
      }
    ]
  } // 沿用业务代码的module配置
};