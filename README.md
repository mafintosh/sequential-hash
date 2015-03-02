# sequential-hash

A lexicographic ordered rolling hash

```
npm install sequential-hash
```

## Usage

``` js
var seqhash = require('sequential-hash')
var hash = seqhash('sha256') // sha256 is the hash algorithm

var top = hash.seed('some random data') // make some a new rolling hash
var words = ['mathias', 'wrote', 'this']

words.forEach(function (word) {
  top = hash.next(word, top)
  console.log(top + ' -> ' + word)
})
```

Running the above produces

```
01!3f40acd112f2dfdeb821fdc6a268325fdabd0989c7e890a50d30cdbfb09501ec -> mathias
02!a04a3ac9464fc64a6c028eb706692a5e869026ca6d4bf1b4f650f630abd1a0ef -> wrote
03!a7dc56135427ba2f7ece433f1db29f30d762b05b95990661881f074774bbd90e -> this
```

## API

#### `hash = seqhash(algo)`

Create a rolling hash based on a hash algorithm

#### `hashString = hash.seed([seedData])`

Generates an initial seed value for a rolling hash.
This value will sort lower than any subsequent hashes.

#### `hashString = hash.next(value, previousHash)`

Hash a value. The returned `hashString` is guaranteed to sort
lexicographically higher than `previousHash`.

## License

MIT
