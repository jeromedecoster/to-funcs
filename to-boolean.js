const isBoolean = require('is-funcs/is-boolean')
const isString = require('is-funcs/is-string')

module.exports = function(data, fallback) {
  if (isBoolean(data)) return data
  if (isString(data)) {
    data = data.trim().toLowerCase()
    if (data === 'true') return true
    if (data === 'false') return false
  }
  if (isBoolean(fallback)) return fallback
}
