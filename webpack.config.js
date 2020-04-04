const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './index.js',
  mode: 'production',
  output: {
    filename: 'ohlocomeu.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: '',
    libraryTarget: 'commonjs',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  externals : {
    axios: {
      commonjs: "axios",
    },
  },
  node: {
    fs: 'empty',
  },
};
