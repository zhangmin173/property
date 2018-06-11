function htmlWebpackPlugin(options) {
  this.options = options;
}

htmlWebpackPlugin.prototype.apply = function(compiler) {
  let paths = this.options.paths;
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(
      data,
      callback
    ) {
      for (let i = paths.length - 1; i >= 0; i--) {
        data.assets.js.unshift(paths[i]);
      }
      callback(null, data);
    });
  });
};

module.exports = htmlWebpackPlugin;
