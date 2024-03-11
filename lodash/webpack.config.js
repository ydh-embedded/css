const path = require('path');
const nodeExternals = require('webpack-node-externals');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/index.js',

  output: {
    filename: 'awesome.js',
    path: path.resolve(__dirname, 'dist'),
  },

  externals: [
    nodeExternals({ modulesDir: path.join(__dirname, '../../node_modules') }),
  ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.ts$/, use: ['ts-loader'] },
    ],
  },

  plugins: [new BundleAnalyzerPlugin()],

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9009,
  },
};