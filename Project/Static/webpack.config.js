const webpack = require('webpack');
const config = {
    entry:  __dirname + '/Javascript/index.jsx',
    output: {
        path: __dirname + '/Distribution',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    }
};
module.exports = config;

