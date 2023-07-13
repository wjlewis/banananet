const path = require('path');
const { BannerPlugin, IgnorePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/server.js',
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
    new IgnorePlugin({
      resourceRegExp: /^fsevents|bufferutil|utf-8-validate$/,
    }),
    new TerserPlugin({
      extractComments: false,
    }),
  ],
  ignoreWarnings: [
    {
      module: /node_modules\/express\/lib\/view\.js/,
      message: /the request of a dependency is an expression/,
    },
  ],
  target: 'node',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
