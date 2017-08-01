const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'ohlocomeu.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }
  ]
},
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
  node: {
    fs: 'empty',
  }
};
