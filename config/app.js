const express = require('express');
const path = require('path');
const open = require('open');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const ENV = process.env.NODE_ENV;
const conf = require('./base/conf')[ENV];
const webpackConfig = require('./dev.conf');
// 给webpack带上配置
const compiler = webpack(webpackConfig);
// 自动更新编译代码中间件
const devMiddleWare = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300, // rebuild 延时, wait so long for more changes
    ignored: /node_modules/,
    poll: 1000, // 设置检测文件变化的间隔时间段，Check for changes every second
  },
  stats: "errors-only",
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})
// 自动刷新浏览器中间件
const hotMiddleWare = webpackHotMiddleware(compiler);
// 创建应用
const app = express();
// 调用中间件
app.use(devMiddleWare);
app.use(hotMiddleWare);
// 调用路由
app.use(require('./base/rooter'));
// 设置静态资源目录
//app.use(express.static(path.join(__dirname, '/')));
app.use('', express.static(path.join(__dirname, '../dist')));
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../dist'));
/**
 * 启动服务
 */
const server = app.listen(conf.port);
console.log('listen http://localhost:' + conf.port);