const clean = require('./clean-case')

module.exports = function(str) {
  return clean(str).replace(/\s(\w)/g, function(m, letter) {
    return letter.toUpperCase()
  })
}
