const path = require('node:path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',

  // output: {
  //   filename: '[name].js',
  // },
  // optimization: {
  //   runtimeChunk: 'single',
  // },

  stats: {
    loggingDebug: ['sass-loader'],
  },

  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader', // 3. Inject styles into DOM
          'css-loader', // 2. Turns css into commonjs
          'sass-loader', // 1. Turns sass into css
        ],
      },
    ],
  },
});
