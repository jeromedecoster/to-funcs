const fn = require('../to-boolean')
const test = require('tape')

test('to-boolean no fallback', function (t) {

  // special case...
  // should be ok, but nobody creates new Boolean(true)
  // so, ignored to speed up the function
  var b1 = new Boolean(true)
  var b2 = new Boolean(false)
  t.equal(fn(b1), undefined)
  t.equal(fn(b2), undefined)
  // ...end of special case

  t.equal(fn(true),      true)
  t.equal(fn(false),     false)
  t.equal(fn('true'),    true)
  t.equal(fn('false'),   false)
  t.equal(fn(' true '),  true)
  t.equal(fn(' false '), false)

  t.equal(fn(null),      undefined)
  t.equal(fn(undefined), undefined)
  t.equal(fn(0),         undefined)
  t.equal(fn(1),         undefined)
  t.equal(fn(NaN),       undefined)
  t.equal(fn('NaN'),     undefined)
  t.equal(fn('1s'),      undefined)
  t.equal(fn('--1.1'),   undefined)
  t.equal(fn('-1.1.'),   undefined)
  t.equal(fn('1.1.'),    undefined)
  t.equal(fn('a'),       undefined)
  t.equal(fn({a:1}),     undefined)
  t.equal(fn(/a/),       undefined)
  t.end()
})

test('to-boolean fallback', function (t) {

  // special case...
  // should be ok, but nobody creates new Boolean(true)
  // so, ignored to speed up the function
  var b1 = new Boolean(true)
  var b2 = new Boolean(false)
  t.equal(fn('a', b1), undefined)
  t.equal(fn('a', b2), undefined)
  // ...end of special case

  t.equal(fn('a', true),      true)
  t.equal(fn('a', false),     false)
  t.equal(fn('a', 'true'),    undefined)
  t.equal(fn('a', 'false'),   undefined)
  t.equal(fn('a', ' true '),  undefined)
  t.equal(fn('a', ' false '), undefined)
  t.equal(fn('a', 0),         undefined)
  t.equal(fn('a', 1),         undefined)
  t.equal(fn('a', NaN),       undefined)
  t.equal(fn('a', /a/),       undefined)
  t.end()
})
