var seqhash = require('./')
var hash = seqhash('sha256') // sha256 is the hash algorithm

var prev = null
var words = ['mathias', 'wrote', 'this']

words.forEach(function (word) {
  prev = hash(word, prev)
  console.log(prev + ' -> ' + word)
})
