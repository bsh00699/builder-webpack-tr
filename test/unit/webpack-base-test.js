const assert = require('assert')

describe('Test webpack.base.js', () => {
  const baseCfg = require('../../lib/webpack.base.js')
  console.log('baseCfg', baseCfg);
  it('entry', () => {
    // assert.equal([1, 2, 3].indexOf(4), -1);
    assert.equal(baseCfg.entry.index, '/Users/xingchao/Documents/work/builder-webpack-tr/test/smoke/template/src/index/index.js')
  })
})