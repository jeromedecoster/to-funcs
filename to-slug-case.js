const clean = require('./clean-case')

module.exports = function(str) {
  return clean(str).replace(/\s/g, '-')
}
