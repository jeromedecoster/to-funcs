# to-funcs

> A very limited subset of to-* functions I use every day

## Install

```bash
npm i to-funcs
```

Package [on npm](https://www.npmjs.com/package/to-funcs)

## API

* [toNumber](#tonumberdata-fallback)

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

## License

MIT
