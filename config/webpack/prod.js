// production config
const merge = require('webpack-merge');
const {resolve} = require('path');

const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: 'js/bundle.[hash].min.js',
    chunkFilename: '[name].bundle.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  plugins: [
    
  ],
});
