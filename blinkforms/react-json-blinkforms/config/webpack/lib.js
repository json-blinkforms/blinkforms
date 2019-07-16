// production config
const merge = require('webpack-merge');
const {resolve} = require('path');

const nodeExternals = require('webpack-node-externals');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: 'index.js',
    path: resolve(__dirname, '../../bin'),
    library: '',
    libraryTarget: 'commonjs',
  },
  externals: [nodeExternals()],
  devtool: 'source-map',
  plugins: [
    
  ],
});
