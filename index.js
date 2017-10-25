const BigNumber   = require('bignumber.js')
const CURRENCIES  = require('./lib/currencies')


class BigCurrency {
  /*
  * The BigCurrency constructor.
  * Create and return a new instance of a BigCurrency object.
  *
  * val {number|string|BigNumber|BigCurrency} A numeric value.
  * ccy {string} the currency ISO4217 alphabetic code (i.e. 'USD', 'EUR'). Ignored if val is BigCurrency.
  */
  constructor(val, ccy) {
    if (val instanceof BigCurrency) {
      this.ccy = val.ccy
      this.big = new BigNumber(val.big)
    } else {
      this.ccy = ccy
      this.big = new BigNumber(val)
    }

    assertValidCurrency(this.ccy)
  }

  toString() {
    let dp  = CURRENCIES[this.ccy].decimalDigits
    let sym = CURRENCIES[this.ccy].symbol
    let val = this.big.toFixed(dp)

    return `${sym}${val}`
  }
}

const P = BigCurrency.prototype

P.absoluteValue = P.abs = function() {
  return op(BigNumber.prototype.abs, this)
}

P.dividedBy = P.div = function(that) {
  assertNotBigCurrency(that)
  return op(BigNumber.prototype.div, this, that)
}

P.equals = P.eq = function(that) {
  if (!(that instanceof BigCurrency)) {
    return false
  }
  return (this.ccy === that.ccy) && BigNumber.prototype.eq.call(this.big, that.big)
}

P.minus = P.sub = function(that) {
  return op(BigNumber.prototype.sub, this, that)
}

P.plus = P.add = function(that) {
  return op(BigNumber.prototype.add, this, that)
}

P.times = P.mul = function(that) {
  assertNotBigCurrency(that)
  return op(BigNumber.prototype.mul, this, that)
}

function op(fn, x, y) {
  if (y instanceof BigCurrency) {
    assertCurrenciesMatch(x.ccy, y.ccy)
    y = y.big
  }

  let val = fn.call(x.big, y)
  return new BigCurrency(val, x.ccy)
}

function assertValidCurrency(ccy) {
  if (!ccy) {
    throw new Error('Missing currency')
  }
  if (!CURRENCIES[ccy]) {
    throw new Error(`Invalid currency ${ccy}`)
  }
}

function assertCurrenciesMatch(ccy1, ccy2) {
  if (ccy1 !== ccy2) {
    throw new Error(`Currency missmatch ${ccy1} - ${ccy2}`)
  }
}

function assertNotBigCurrency(val) {
  if (val instanceof BigCurrency) {
    throw new Error('BigCurrency is not allowed for this operation. Use BigNumber, Number or String.')
  }
}

module.exports = BigCurrency
