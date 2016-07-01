const fn = require('../to-number')
const test = require('tape')

test('to-number no fallback', function (t) {

  // special case...
  // should be true, but nobody creates new Number(12) or new String('12')
  // so, ignored to speed up the function
  var n1 = new Number(12)
  var n2 = new Number(12.3)
  var n3 = new Number(-3)
  var s1 = new String('12')
  var s2 = new String('12.3')
  var s3 = new String('-3')
  var s4 = new String('infinity')
  var s5 = new String('-Infinity')
  var s6 = new String('-1.1.')
  var s7 = new String(' 1.1 ')
  var s8 = new String('-0')
  var s9 = new String(' -infinity ')
  var s10 = new String(' -Infinity ')
  var s11 = new String(' 1e2 ')
  var s12 = new String(' -1e2 ')
  var s13 = new String(' -.0123e3 ')
  t.equal(fn(n1),  undefined)
  t.equal(fn(n2),  undefined)
  t.equal(fn(n3),  undefined)
  t.equal(fn(s1),  undefined)
  t.equal(fn(s2),  undefined)
  t.equal(fn(s3),  undefined)
  t.equal(fn(s4),  undefined)
  t.equal(fn(s5),  undefined)
  t.equal(fn(s6),  undefined)
  t.equal(fn(s7),  undefined)
  t.equal(fn(s8),  undefined)
  t.equal(fn(s9),  undefined)
  t.equal(fn(s10), undefined)
  t.equal(fn(s11), undefined)
  t.equal(fn(s12), undefined)
  t.equal(fn(s13), undefined)
  // ...end of special case

  t.equal(fn(-1.1), -1.1)
  t.equal(fn(-1),   -1)
  t.equal(fn(0),    0)
  t.equal(fn(+0),   0)
  t.equal(fn(-0),   0)
  t.equal(fn(1),    1)
  t.equal(fn(1.1),  1.1)
  t.equal(fn(Number.POSITIVE_INFINITY),  Infinity)
  t.equal(fn(Number.NEGATIVE_INFINITY), -Infinity)
  t.equal(fn(Infinity),  Number.POSITIVE_INFINITY)
  t.equal(fn(-Infinity), Number.NEGATIVE_INFINITY)

  t.equal(fn('-1.1'),      -1.1)
  t.equal(fn('-1'),        -1)
  t.equal(fn('0'),         0)
  t.equal(fn('+0'),        0)
  t.equal(fn('-0'),        0)
  t.equal(fn('1'),         1)
  t.equal(fn('1.1'),       1.1)
  t.equal(fn('+1.1'),      1.1)
  t.equal(fn(' 1.1 '),     1.1)
  t.equal(fn('1e2'),       100)
  t.equal(fn('-1e2'),      -100)
  t.equal(fn(' .0123e3 '), 12.3)
  t.equal(fn('infinity'),  Infinity)
  t.equal(fn('Infinity'),  Infinity)
  t.equal(fn('-infinity'), -Infinity)
  t.equal(fn('-Infinity'), -Infinity)

  t.equal(fn(NaN),     undefined)
  t.equal(fn('NaN'),   undefined)
  t.equal(fn('1s'),    undefined)
  t.equal(fn('--1.1'), undefined)
  t.equal(fn('-1.1.'), undefined)
  t.equal(fn('1.1.'),  undefined)
  t.equal(fn('a'),     undefined)
  t.equal(fn({a:1}),   undefined)
  t.equal(fn(/a/),     undefined)
  t.end()
})

test('to-number fallback', function (t) {

  // special case...
  // should be true, but nobody creates new Number(12)
  // so, ignored to speed up the function
  var n1 = new Number(1)
  var n2 = new Number(-1)
  t.equal(fn('a', n1), undefined)
  t.equal(fn('a', n2), undefined)
  // ...end of special case

  var n3 = new Number(NaN)
  var noop = function() {}

  t.equal(fn('a', -1.1),      -1.1)
  t.equal(fn('a', -1),        -1)
  t.equal(fn('a', 0),         0)
  t.equal(fn('a', 1),         1)
  t.equal(fn('a', 1.1),       1.1)
  t.equal(fn('a', null),      undefined)
  t.equal(fn('a', Infinity),  Number.POSITIVE_INFINITY)
  t.equal(fn('a', -Infinity), Number.NEGATIVE_INFINITY)
  t.equal(fn('a', Number.POSITIVE_INFINITY), Infinity)
  t.equal(fn('a', Number.NEGATIVE_INFINITY), -Infinity)
  t.equal(fn('a', NaN),       undefined)
  t.equal(fn('a', '1'),       undefined)
  t.equal(fn('a', n3),        undefined)
  t.equal(fn('a', noop),      undefined)
  t.equal(fn('a', /a/),       undefined)
  t.end()
})

// test('to-number safe true', function (t) {

//   // the end of special case for new Number(12) or new String('12')
//   var n1 = new Number(12)
//   var n2 = new Number(12.3)
//   var n3 = new Number(-3)
//   var n4 = new Number(NaN)
//   var s1 = new String('12')
//   var s2 = new String('12.3')
//   var s3 = new String('-3')
//   var s4 = new String('infinity')
//   var s5 = new String('-Infinity')
//   var s6 = new String('-1.1.')
//   var s7 = new String(' 1.1 ')
//   var s8 = new String('-0')
//   var s9 = new String(' -infinity ')
//   var s10 = new String(' -Infinity ')
//   var s11 = new String(' 1e2 ')
//   var s12 = new String(' -1e2 ')
//   var s13 = new String(' -.0123e3 ')
//   t.equal(fn(n1, null, true),   12)
//   t.equal(fn(n2, null, true),   12.3)
//   t.equal(fn(n3, null, true),   -3)

//   t.equal(fn(s1,  null, true),  12)
//   t.equal(fn(s2,  null, true),  12.3)
//   t.equal(fn(s3,  null, true),  -3)
//   t.equal(fn(s4,  null, true),  Infinity)
//   t.equal(fn(s5,  null, true),  -Infinity)
//   t.equal(fn(s6,  null, true),  undefined)
//   t.equal(fn(s7,  null, true),  1.1)
//   t.equal(fn(s8,  null, true),  0)
//   t.equal(fn(s9,  null, true),  -Infinity)
//   t.equal(fn(s10, null, true),  -Infinity)
//   t.equal(fn(s11, null, true),  100)
//   t.equal(fn(s12, null, true),  -100)
//   t.equal(fn(s13, null, true),  -12.3)

//   t.equal(fn('a', n1, true), 12)
//   t.equal(fn('a', n2, true), 12.3)
//   t.equal(fn('a', n4, true), undefined)
//   t.end()
// })