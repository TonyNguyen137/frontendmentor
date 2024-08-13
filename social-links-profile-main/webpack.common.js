const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

module.exports = {
  entry: {
    index: './src/index.js',
    // test: './src/test.scss', // Separate SCSS entry point for test.scss
    // home: './src/home.scss', // Separate SCSS entry point for home.scss
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: `images/${currentYear}/${currentMonth}/[name].[hash][ext]`,
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: '[name].html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'html-loader',
      },

      {
        test: /\.(png|jpe?g|gif|svg|woff2|woff)$/i,
        type: 'asset/resource',

        // generator: {
        //   filename: 'static/[name][ext]', // Output path and filename pattern
        // },
      },
    ],
  },
};
