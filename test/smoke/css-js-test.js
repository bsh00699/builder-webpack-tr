const glob = require('glob-all')

describe('Checking generated css and js files', () => {
  it('should generate html files', (done) => {
    const files = glob.sync([
      './build/index.js',
      './build/search.js',
      './build/search_*.css',
    ])
    if (files.length > 0) {
      done()
    } else {
      throw new Error('No css and js files generated')
    }
  })
})