var lexint = require('lexicographic-integer')
var crypto = require('crypto')

var seq = function (hash) {
  return lexint.unpack(hash.slice(0, hash.indexOf('!')), 'hex')
}

module.exports = function (algo) {
  return function (value, prev) {
    var num = prev ? lexint.pack(1 + seq(prev), 'hex') : lexint.pack(0, 'hex')
    return num + '!' + crypto.createHash(algo).update(num + '\n' + (prev || '') + '\n').update(value).digest('hex')
  }
}
