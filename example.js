var seqhash = require('./')
var hash = seqhash('sha256') // sha256 is the hash algorithm

var prev = hash.seed('some random data') // make some a new rolling hash
var words = ['mathias', 'wrote', 'this']

words.forEach(function (word) {
  prev = hash.next(word, prev)
  console.log(prev + ' -> ' + word)
})
