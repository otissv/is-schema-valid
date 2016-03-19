
const config = require('./app.config');
const path = require('path');
const webpack = require('webpack');


module.exports = {
  // debug: true,
  // devtool: '#eval-source-map',
  context: path.join(__dirname, config.src.base),

  entry: config.src.entry,

  output: {
    path: path.join(__dirname, config.dest.scripts),
    publicPath: '/',
    filename:  config.dest.output,
    libraryTarget: 'commonjs2'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      React   : 'react',
      ReactDOM: 'react-dom'
    })
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  }
};
