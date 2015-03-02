var tape = require('tape')
var seqhash = require('./')('sha1')

tape('consistent seed', function (t) {
  t.notEqual(seqhash.seed(), seqhash.seed(), 'not the same seed')
  t.same(seqhash.seed('hello'), seqhash.seed('hello'), 'same seed for same input')
  t.notEqual(seqhash.seed('hello'), seqhash.seed('world'), 'different seed for different input')
  t.end()
})

tape('rolling hash', function (t) {
  var seed = seqhash.seed('hello')

  t.notEqual(seqhash.next('hello', seed), seqhash.next('world', seed), 'different values different hashes')
  t.same(seqhash.next('test', seed), seqhash.next('test', seed), 'same values same hashes')
  t.end()
})

tape('ordered', function (t) {
  var seed = seqhash.seed('hello')
  var hashes = []
  var hashes2 = []
  var top = seed

  for (var i = 0; i < 10; i++) {
    top = seqhash.next('' + i, top)
    hashes.push(top)
  }

  t.same(hashes, [].concat(hashes).sort(), 'was ordered')

  top = seed
  for (var j = 0; j < 10; j++) {
    top = seqhash.next('' + j, top)
    hashes2.push(top)
  }

  t.same(hashes2, hashes, 'consistent')
  t.end()
})

tape('seq', function (t) {
  var seed = seqhash.seed('hello')
  var hashes = []
  var top = seed

  for (var i = 0; i < 10; i++) {
    top = seqhash.next('' + i, top)
    hashes.push(top)
  }

  hashes.forEach(function (hash, i) {
    t.same(seqhash.seq(hash), i + 1, 'can decode prefix')
  })

  t.end()
})
