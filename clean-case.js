const toAscii = require('./to-ascii')

// notWord is equivalent to [^A-Za-z0-9_-]
const notWord    = /[^\w\-]+/g
const hasCamel   = /([a-z][A-Z]|[A-Z][a-z])/
const splitCamel = /(.)([A-Z]+)/g
// match things before two consecutive word chars [A-Za-z0-9]
const beforeTwo  = /[\W_]+(.|$)/g

module.exports = function(str) {
  str = toAscii(str).replace(notWord, ' ')
  if (hasCamel.test(str)) {
    str = str.replace(splitCamel, function (m, previous, uppers) {
      return previous + ' ' + uppers.toLowerCase().split('').join(' ')
    })
  }
  return str.toLowerCase().replace(/[\W_]+(.|$)/g, function (m, match) {
    return match ? ' ' + match : ''
  }).trim()
}
