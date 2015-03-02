# sequential-hash

A lexicographical ordered rolling hash

```
npm install sequential-hash
```

[![build status](http://img.shields.io/travis/mafintosh/sequential-hash.svg?style=flat)](http://travis-ci.org/mafintosh/sequential-hash)

## Usage

``` js
var seqhash = require('sequential-hash')
var hash = seqhash('sha256') // sha256 is the hash algorithm

var prev = null
var words = ['mathias', 'wrote', 'this']

words.forEach(function (word) {
  prev = hash(word, prev)
  console.log(prev + ' -> ' + word)
})
```

Running the above produces

```
00!c1768bf97517f3da6948ee49b4d7078890c910a9fc07065a382184a4a3d9457a -> mathias
01!f16200e82c592e37e0f938c12ba4b3d88aa61b1df873ab03b60932956211ec03 -> wrote
02!34efbd1375266a04c302de321196d0a029bee922ca8044fe2cf8ca38289e3333 -> this
```

## API

#### `hash = seqhash(algo)`

Create a rolling hash function based on a hash algorithm (`sha1`, `sha256`, etc)

#### `hashString = hash(value, [previousHash])`

Hash a value based on a previous hash. The returned `hashString` is guaranteed to sort
lexicographically higher than `previousHash`.

## License

MIT
