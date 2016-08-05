const isNumber = require('is-funcs/is-number')
const isString = require('is-funcs/is-string')

const reg = /^\s*([-+]{0,1}\d*\.{0,1}\d+)\s*([\/\*+-])\s*([-+]{0,1}\d*\.{0,1}\d+)\s*$/

module.exports = function(data, fallback) {
  if (isNumber(data)) return data
  if (isString(data)) {
    data = data.trim().toLowerCase()
    if (data === 'infinity') return Infinity
    if (data === '-infinity') return -Infinity
    var n = +data
    if ((n - n + 1) >= 0) return n

    if (reg.test(data)) {
      n = new Function('return (' + data + ')')()
      if (n === Infinity || n === -Infinity) return n
      if ((n - n + 1) >= 0) {
        return Math.round(n * 10000000000) / 10000000000
      }
    }
  }

  if (isNumber(fallback)) return fallback
}
