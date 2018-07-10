const test = require('ava')
const sloppyRound = require('../lib/sloppy-round')

test('it returns number sloppy rounded', t => {
  const num = 50.986756
  const expected = '50.986'
  t.is(sloppyRound(num), expected, 'round OK')
})
