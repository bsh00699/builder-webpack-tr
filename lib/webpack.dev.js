const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const baseCfg = require('./webpack.base');

const devCfg = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    hot: true,
    // port: 8005,
    open: true,
    stats: 'errors-only',
  },
  devtool: 'source-map',
};

module.exports = merge(baseCfg, devCfg);
