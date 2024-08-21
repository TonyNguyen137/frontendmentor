const path = require('node:path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  //   entry: {
  //     index: './src/index.js',
  //   },

  devtool: 'inline-source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: `images/${currentYear}/${currentMonth}/[name].[hash][ext]`,
    clean: true,
  },

  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './src/index.html',
    // }),
    new HtmlBundlerPlugin({
      entry: {
        // define templates here
        index: 'src/views/index.html', // => dist/index.html
      },
      js: {
        // output filename for JS
        filename: '[name].[contenthash:8].js',
      },
      css: {
        // output filename for CSS
        filename: 'c[name].[contenthash:8].css',
      },
    }),
  ],

  //   module: {
  //     rules: [
  //       {
  //         test: /\.html$/i,
  //         use: 'html-loader',
  //       },
  //     ],
  //   },

  resolve: {
    alias: {
      '@scripts': path.join(__dirname, 'src/js'),
      '@styles': path.join(__dirname, 'src/scss'),
      '@images': path.join(__dirname, 'src/images'),
    },
  },
};
