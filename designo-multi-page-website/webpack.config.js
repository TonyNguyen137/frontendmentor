const path = require('path')
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin')
const { FaviconsBundlerPlugin } = require('html-bundler-webpack-plugin/plugins')
const { globalData } = require('./src/views/data')
const { data } = require('./src/views/data')
const glob = require('glob')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const PATHS = {
  src: path.join(__dirname, 'src'),
}
console.log('dataHome: ', data.home)

module.exports = (env) => {
  console.log('env ', env)

  return {
    devtool: env.WEBPACK_SERVE ? 'source-map' : false,

    stats: {
      loggingDebug: ['sass-loader'],
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    resolve: {
      alias: {
        '@scripts': path.join(__dirname, 'src', 'js'),
        '@styles': path.join(__dirname, 'src', 'scss'),
        '@images': path.join(__dirname, 'src', 'assets', 'images'),
        '@fonts': path.join(__dirname, 'src', 'assets', 'fonts'),
      },
    },

    plugins: [
      new HtmlBundlerPlugin({
        // path to templates
        entry: [
          {
            import: 'src/views/index.hbs', // template file
            filename: 'index.html', // => dist/index.html
            data: data.home, // pass variables into template
          },
        ],
        // use handlebars templating engine
        preprocessor: 'handlebars',
        // define handlebars options
        preprocessorOptions: {
          partials: ['src/views/partials'],
        },

        js: {
          // output filename for JS
          filename: 'static/[name].[contenthash:8].js',
        },
        css: {
          // output filename for CSS
          filename: 'static/[name].[contenthash:8].css',
        },

        minify: env.WEBPACK_BUILD ?? false,
        data: globalData,
      }),
      env.WEBPACK_BUILD &&
        new PurgeCSSPlugin({
          paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
          content: ['**/*.js', '**/*.html', '**/*.hbs'],
          safelist: {
            // standard: [/aria/, /data/, /:focus/],
            // deep: [/aria/, /data/, /^.*\[/],
            // greedy: [/aria/, /data/, /^.*\[/],
          },
        }),
      // new FaviconsBundlerPlugin({
      //   enabled: 'auto', // true, false, auto - generate favicons in production mode only
      //   // favicons configuration options, see https://github.com/itgalaxy/favicons#usage
      //   faviconOptions: {
      //     path: 'src/assets/images/favicon', // favicons output path relative to webpack output.path
      //     icons: {
      //       android: true, // Create Android homescreen icon.
      //       appleIcon: true, // Create Apple touch icons.
      //       favicons: true, // Create regular favicons.
      //       windows: false, // Create Windows 8 tile icons.
      //       // yandex: false, // Create Yandex browser icon.
      //       // appleStartup: false, // Create Apple startup images.
      //     },
      //   },
      // }),
    ],

    module: {
      rules: [
        {
          test: /\.(scss)$/,
          use: [
            'css-loader',
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
                          'custom-properties': false,
                        },
                      },
                    ],
                    ['postcss-sort-media-queries'],
                  ],
                },
              },
            },
            ,
            'sass-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(png|jp?g|webp)$/,
          type: 'asset',
          generator: {
            // save images to file
            filename: (ob) => {
              const params = new URLSearchParams(ob.module.resourceResolveData.query)

              // Get the value of the 'w' parameter
              const width = params.get('w')
              // console.log('WIDTH: ', width);

              if (width) {
                return `static/[name]-w${width}[ext]`
              }
              return `static/[name][ext]`
            },
          },

          parser: {
            dataUrlCondition: {
              // inline images <= 1 KB
              maxSize: 1024,
            },
          },
        },

        {
          test: /\.(ico|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: 'static/[name].[hash:8][ext][query]',
          },
        },

        {
          test: /\.(ttf|woff2|woff)/,
          type: 'asset',
          generator: {
            // save fonts to file
            filename: 'static/[name].[ext]',
          },
        },
      ],
    },
    optimization: {
      // minimize: false,
      minimizer: [
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.sharpMinify,
          },
          generator: [
            {
              // You can apply generator using `?as=webp`, you can use any name and provide more options
              preset: 'webp',
              implementation: ImageMinimizerPlugin.sharpGenerate,
              options: {
                encodeOptions: {
                  // Please specify only one codec here, multiple codecs will not work
                  webp: {
                    quality: 70,
                  },
                },
              },
            },
            {
              // You can apply generator using `?as=avif`, you can use any name and provide more options
              preset: 'avif',
              implementation: ImageMinimizerPlugin.sharpGenerate,
              options: {
                encodeOptions: {
                  // Please specify only one codec here, multiple codecs will not work
                  avif: {
                    quality: 70,
                  },
                },
              },
            },
          ],
        }),
      ],
    },

    // enable HMR with live reload
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      watchFiles: {
        paths: ['src/**/*.*'],
        options: {
          usePolling: true,
        },
      },
    },
  }
}
