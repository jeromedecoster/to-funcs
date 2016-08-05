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
  t.equal(fn('-1.'),       -1)
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

function dec10(n) { return Math.round(n * 10000000000) / 10000000000 }

test('to-number expression', function (t) {

  // special case...
  // should be parsed, but nobody write 1. + 2.
  // so, ignored to simplify and speed up the function
  t.equal(fn(' 1. + 2. '), undefined)
  // ...end of special case

  t.equal(fn(' 1 + 2 '),     3)
  t.equal(fn(' 1 / 2 '),     .5)
  t.equal(fn(' 1 - 2 '),     -1)
  t.equal(fn(' 1 * 2 '),     2)
  t.equal(fn(' +1 + +2 '),   3)
  t.equal(fn(' +1 / +2 '),   .5)
  t.equal(fn(' +1 - +2 '),   -1)
  t.equal(fn(' +1 * +2 '),   2)
  t.equal(fn(' -1 + -2 '),   -3)
  t.equal(fn(' -1 / -2 '),   .5)
  t.equal(fn(' -1 - -2 '),   1)
  t.equal(fn(' -1 * -2 '),   2)
  t.equal(fn(' 1 + 0 '),     1)
  t.equal(fn(' 1 / 0 '),     Infinity)
  t.equal(fn(' 1 - 0 '),     1)
  t.equal(fn(' 1 * 0 '),     0)
  t.equal(fn(' -1 / 0 '),    -Infinity)
  t.equal(fn(' 0 / 0 '),     undefined)
  t.equal(fn(' 0 / 1 '),     0)
  t.equal(fn(' 0 / 2 '),     0)
  t.equal(fn(' 1.0 + 2.0 '), 3)
  t.equal(fn(' 1.0 / 2.0 '), .5)
  t.equal(fn(' 1.0 - 2.0 '), -1)
  t.equal(fn(' 1.0 * 2.0 '), 2)
  t.equal(fn(' 1.1 + 2.1 '), 3.2)
  t.equal(fn(' 1.1 / 2.1 '), dec10( 1.1 / 2.1 ))
  t.equal(fn(' 1.1 - 2.1 '), -1)
  t.equal(fn(' 1.1 * 2.1 '), 2.31) // insteadof 2.3100000000000005
  t.equal(fn(' .1 + .2 '),   .3)
  t.equal(fn(' .1 / .2 '),   .5)
  t.equal(fn(' .1 - .2 '),   -.1)
  t.equal(fn(' .1 * .2 '),   .02) // insteadof 0.020000000000000004
  t.equal(fn(' +.1 + +.2 '), .3)
  t.equal(fn(' +.1 / +.2 '), .5)
  t.equal(fn(' +.1 - +.2 '), -.1)
  t.equal(fn(' +.1 * +.2 '), .02)
  t.equal(fn(' -.1 + -.2 '), -.3) // insteadof -0.30000000000000004
  t.equal(fn(' -.1 / -.2 '), .5)
  t.equal(fn(' -.1 - -.2 '), .1)
  t.equal(fn(' -.1 * -.2 '), .02) // insteadof 0.020000000000000004

  t.equal(fn(' 1 + 1.1. '),  undefined)
  t.equal(fn(' 1 + -+1.1 '), undefined)
  t.equal(fn(' 1 + 1..1 '),  undefined)
  t.end()
})


