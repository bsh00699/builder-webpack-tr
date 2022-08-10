const autoprefixer = require('autoprefixer');
const glob = require('glob');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 目录清理
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const projectRoot = process.cwd()

// 多页面打包
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
  entryFiles.forEach((index) => {
    const match = index.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = index;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        inlineSource: '.css$',
        template: path.join(projectRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ['commons', pageName], // 将打包生成的所有资源(JS/CSS)自动引入到html
        inject: true,
        minify: {
          html5: true,
          // 移除空格
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          // 移除注释
          removeComments: true,
        },
      }),
    );
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    filename: "[name].js", // 输出文件名
    path: path.join(projectRoot, "build") //输出路径
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          'babel-loader'
        ],
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 提取css文件，与style-loader功能互斥,去掉style-loader
          'css-loader',
        ],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  browsers: ['last 2 version', '>1%', 'ios 7'],
                }),
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 1个rem 代表 75px
              remPrecision: 8, // px转rem 时小数点后8位
            },
          },
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8][ext]',
          },
        }],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8][ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    // 构建异常捕获
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors
          && stats.compilation.errors.length
          && process.argv.indexOf('--watch') === -1) {
          // console.log('build error'); // eslint-disable-line
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only',
};
