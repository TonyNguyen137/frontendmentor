const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

module.exports = {
  entry: {
    index: './src/index.js',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: `images/${currentYear}/${currentMonth}/[name].[hash][ext]`,
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
        test: /\.(png|jpe?g)$/i,
        type: 'asset/resource',

        generator: {
          filename: `images/[name][ext]`, // Output path and filename pattern
        },
      },
      {
        test: /\.(woff2|woff)$/i,
        type: 'asset/resource',

        generator: {
          filename: 'font/[name][ext]', // Output path and filename pattern
        },
      },
    ],
  },
};
