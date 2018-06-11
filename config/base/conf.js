module.exports = {
  dev: {
    mobile: false,
    mode: 'development',
    filename: '[name].js',
    publicPath: '/',
    devtool: 'eval-source-map',
    assets: {
      publicPath: '',
      outputPath: ''
    },
    port: 5555
  },
  prod: {
    mobile: true,
    mode: 'production',
    filename: '[name].[hash:8].js',
    publicPath: 'http://admin.nextdog.cc/Projects/WuYe/dist/',
    devtool: false,
    assets: {
      publicPath: 'http://admin.nextdog.cc/Projects/WuYe/dist/assets/',
      outputPath: 'assets/'
    }
  }
};