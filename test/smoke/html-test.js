const glob = require('glob-all')

describe('Checking generated html files', () => {
  it('should generate html files', (done) => {
    const files = glob.sync([
      './build/index.html',
      './build/search.html',
    ])
    if (files.length > 0) {
      done()
    } else {
      throw new Error('No html files generated')
    }
  })
})