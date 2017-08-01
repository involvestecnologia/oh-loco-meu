const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'ohlocomeu.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    fs: 'empty',
  }
};
