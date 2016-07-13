# to-funcs

> A very limited subset of to-* functions I use every day

## Install

```bash
npm i to-funcs
```

Package [on npm](https://www.npmjs.com/package/to-funcs)

## API

* [toAscii](#toasciistr)
* [toBoolean](#tobooleandata-fallback)
* [toCamelCase](#tocamelcasestr)
* [toNumber](#tonumberdata-fallback)
* [toSlugCase](#toslugcasestr)

#### toAscii(str)

Simplify a string by removing unsupported characters by the ASCII table

Swap when possible additional characters by their *equivalent*

For example

| Chars | Become |
| :------ | :------- |
| **À Á Â Ã Ä Å** | A |
| **ź ż ž** | z |
| **« » “ ” 〝 〞** | " |


```js
const toAscii = require('to-funcs/to-ascii')

// hello-world
toAscii('hêllø‐wörld')

// -
toAscii('💣-ؿ')
```

---

#### toBoolean(data, [fallback])

Check if `data` is a **String representation** of a **Boolean**

If yes, convert and return the boolean value otherwise return `fallback`

If `data` is already a boolean, return `data`

| Argument | Action |
| :------ | :------- |
| **data** | the tested `data` |
| **fallback** | optional `fallback`, default to `undefined`. Must be a `boolean` |

```js
const toBoolean = require('to-funcs/to-boolean')

// true
toBoolean('true')

// undefined
toBoolean('123')

// false
toBoolean('123', false)

// false
toBoolean(false)
```

---

#### toCamelCase(str)

Convert a string to a camel case

The string is simplified with [toAscii](#toasciistr)

```js
const toCamelCase = require('to-funcs/to-camel-case')

// helloWorld
toCamelCase('hêllø‐wörld')
```

---

#### toNumber(data, [fallback])

Check if `data` is a **String representation** of a **Number**

If yes, convert and return the numeric value otherwise return `fallback`

If `data` is already a number, return `data`

| Argument | Action |
| :------ | :------- |
| **data** | the tested `data` |
| **fallback** | optional `fallback`, default to `undefined`. Must be a `number` |

```js
const toNumber = require('to-funcs/to-number')

// 1.23
toNumber('1.23')

// undefined
toNumber('0.1s')

// 1
toNumber('3.45s', 1)

// -1.23
toNumber(-1.23)
```

---

#### toSlugCase(str)

Convert a string to a slug case

The string is simplified with [toAscii](#toasciistr)

```js
const toSlugCase = require('to-funcs/to-slug-case')

// hello-world
toSlugCase('hêlløWörld')

// hello-world
toSlugCase('Hêllø Wörld')
```

## Thanks

Mainly forked / inspired on
- [camelcase](https://github.com/sindresorhus/camelcase)
- [to-camel-case](https://github.com/ianstormtaylor/to-camel-case)
- [to-slug-case](https://github.com/ianstormtaylor/to-slug-case)

Tips / help from
- [codetable](http://www.codetable.net/decimal/197)
- [deburr](https://github.com/smikhalevski/deburr/blob/master/src/deburr.json)
- [typeit](http://swedish.typeit.org)
- [wikipedia](https://en.wikipedia.org/wiki/Latin_Extended-A)

## License

MIT
