const path = require('path');

module.exports = {
  entry: {
    prefixProperty: ['./src/prefix-property']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'prefix-property.js',
    library: ['[name]'],
    libraryTarget: 'umd'
  },
  stats: { colors: true },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};