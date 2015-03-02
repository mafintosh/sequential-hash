var cuid = require('cuid')
var lexint = require('lexicographic-integer')
var crypto = require('crypto')

module.exports = function (algo) {
  var next = function (value, prev) {
    var num = lexint.pack(1 + seq(prev), 'hex')
    return num + '!' + crypto.createHash(algo).update(num + '\n' + prev + '\n').update(value).digest('hex')
  }

  var seed = function (value) {
    return lexint.pack(0, 'hex') + '!' + crypto.createHash(algo).update(value || cuid()).digest('hex')
  }

  var seq = function (hash) {
    return lexint.unpack(hash.slice(0, hash.indexOf('!')), 'hex')
  }

  return {algorithm: algo, next: next, seed: seed, seq: seq}
}
