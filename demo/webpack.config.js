const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const packageJson = require('./package.json');

const REDUX_WEBSOCKET_VERSION = packageJson.dependencies['@giantmachines/redux-websocket'];
const { NODE_ENV: env = 'development' } = process.env;

module.exports = {
  entry: {
    app: ['./src/app/Index.tsx'],
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
        options: {
          useCache: true,
          useBabel: true,
          babelCore: '@babel/core',
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        REDUX_WEBSOCKET_VERSION: JSON.stringify(REDUX_WEBSOCKET_VERSION),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'app', 'index.html'),
      env,
    }),
  ],
};
