const path = require('node:path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');

module.exports = (env) => {
  return {
    mode: env.mode, // "production" || "development"

    entry: {
      index: `./src/index.js`,
    },

    output: {
      filename: '[name]-[contenthash].min.js',
      path: path.resolve(__dirname, 'public'),
      clean: true,
      hashDigestLength: 6,
    },
    stats: {
      loggingDebug: ['sass-loader'],
    },
    optimization: {
      minimize: env.mode === 'development' ? false : true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: `./src/index.html`,
        filename: '[name].html',
      }),
      new PurgeCSSPlugin({
        paths: glob.sync(`./src/**/*`, { nodir: true }),
      }),
      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash].css', // Output filename for CSS
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',

          generator: {
            filename: 'static/[name]-[contenthash][ext]', // Output path and filename pattern
          },
        },
        {
          test: /\.html$/i,
          use: 'html-loader',
        },
        {
          test: /\.scss$/i,
          use: [
            env.mode === 'development'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader, // 3. extract css into files
            'css-loader', // 2. Turns css into commonjs
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      {
                        stage: 3,
                        features: {
                          'nesting-rules': true,
                          clamp: true,
                        },
                      },
                    ],
                    ['postcss-sort-media-queries'],
                  ],
                },
              },
            },

            'sass-loader', // 1. Turns sass into css
          ],
        },
      ],
    },
  };
};
