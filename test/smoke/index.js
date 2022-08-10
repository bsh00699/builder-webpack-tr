const path = require('path')
const webpack = require('webpack');
const rimraf = require('rimraf')
const Mocha = require('mocha')

const mocha = new Mocha({
  timeout: 10000
})

process.chdir(path.join(__dirname, 'template')) // 进入到 template 目录
rimraf('./build', () => {
  const prodCfg = require('../../lib/webpack.prod')
  webpack(prodCfg, (err, stats) => {
    if (err) {
      console.error('test err', err)
      process.exit(2)
    }
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false
    }));

    console.log('######################');
    console.log('Webpack build seccess');
    console.log('Begin run test case');
    console.log('######################');

    mocha.addFile(path.join(__dirname, 'html-test.js'))
    mocha.addFile(path.join(__dirname, 'css-js-test.js'))
    mocha.run()
  })
})