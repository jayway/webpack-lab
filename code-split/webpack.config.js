const path = require('path');

module.exports = {
  name: 'Client',
  devtool: 'source-map',

  entry: './app/index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ],
  },
};