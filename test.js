var tape = require('tape')
var seqhash = require('./')('sha1')

tape('consistent seed', function (t) {
  t.same(seqhash('hello'), seqhash('hello'), 'same seed for same input')
  t.notEqual(seqhash('hello'), seqhash('world'), 'different seed for different input')
  t.end()
})

tape('rolling hash', function (t) {
  var seed = seqhash('hello')

  t.notEqual(seqhash('hello', seed), seqhash('world', seed), 'different values different hashes')
  t.same(seqhash('test', seed), seqhash('test', seed), 'same values same hashes')
  t.end()
})

tape('ordered', function (t) {
  var seed = seqhash('hello')
  var hashes = []
  var hashes2 = []
  var top = seed

  for (var i = 0; i < 10; i++) {
    top = seqhash('' + i, top)
    hashes.push(top)
  }

  t.same(hashes, [].concat(hashes).sort(), 'was ordered')

  top = seed
  for (var j = 0; j < 10; j++) {
    top = seqhash('' + j, top)
    hashes2.push(top)
  }

  t.same(hashes2, hashes, 'consistent')
  t.end()
})
