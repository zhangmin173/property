const ExtractTextPlugin = require('extract-text-webpack-plugin');

const conf = require('./conf')[process.env.NODE_ENV];

module.exports = {
  dev: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
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
        ]
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
  },
  prod: {
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
  }
};