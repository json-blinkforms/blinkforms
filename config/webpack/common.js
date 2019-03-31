require('typescript-require');

// shared config (dev and prod)
const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'index.ts', 'index.tsx', 'index.js', 'index.jsx'],
    alias: {},
  },
  context: path.resolve(__dirname, '../../src'),
  module: {
    rules: [
      /*{
        test: /\.ts|\.tsx$/,
        enforce: 'pre',
        use: [
           {
              loader: 'tslint-loader',
              options: {
                  configFile: 'tslint.json',
                  typeCheck: true,
                  tsConfigFile: 'tsconfig.json',
                  emitErrors: true,
                  failOnHint: true,
                  fix: true
              }
           }
        ]
      },*/
      {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.NormalModuleReplacementPlugin(/@blinkforms\/core\/.*/, function(resource) {
        resource.request = resource.request.replace(/@blinkforms\/core/, path.join('..', 'typescript-core', 'src'));
    }),
  ],
  performance: {
    hints: false,
  },
};
