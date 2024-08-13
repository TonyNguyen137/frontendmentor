const path = require('node:path');

module.exports = {
  mode: 'production',

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
};
