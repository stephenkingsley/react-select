var path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './example/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }
    ],
  },
};
