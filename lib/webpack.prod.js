const merge = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const cssnano = require('cssnano');
const baseCfg = require('./webpack.base');

const prodCfg = {
  mode: 'production',
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new HtmlWebpackExternalsPlugin({ // 基础库分离: 基础包通过 cdn 引入，不打入 bundle 中
      externals: [
        {
          module: 'react',
          entry: 'https://now8.gtimg.com/now/lib/16.2.0/react.min.js', // cdn 文件
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://now8.gtimg.com/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  optimization: { // 页面公共脚本分离
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};


module.exports = merge(baseCfg, prodCfg);
