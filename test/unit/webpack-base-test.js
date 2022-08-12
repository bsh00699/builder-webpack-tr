const assert = require('assert')
const chai = require('chai');
// const assert = chai.assert;    // Using Assert style
const expect = chai.expect;

describe('Test webpack.base.js', () => {
  const baseCfg = require('../../lib/webpack.base.js')
  console.log('baseCfg', baseCfg);
  it('entry', () => {
    // assert.equal(baseCfg.entry.index, '/Users/xingchao/Documents/work/builder-webpack-tr/test/smoke/template/src/index/index.js')
    expect(baseCfg).to.have.property('entry')
    expect(baseCfg).to.have.property('output')
    expect(baseCfg).to.have.property('module')
    expect(baseCfg).to.have.property('plugins')
    expect(baseCfg).to.have.property('stats')
  })
})