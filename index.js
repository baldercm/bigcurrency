const BigNumber   = require('bignumber.js')
const CURRENCIES  = require('./lib/currencies')


class BigCurrency extends BigNumber {
  /*
  * The BigCurrency constructor.
  * Create and return a new instance of a BigCurrency object.
  *
  * val {number|string|BigNumber|BigCurrency} A numeric value.
  * [ccy] {string} the currency ISO4217 alphabetic code (i.e. 'USD', 'EUR')
  */
  constructor(val, ccy) {
    super(val)
    if (val instanceof BigCurrency) {
      this.ccy = val.ccy
    }
    if (ccy) {
      this.ccy = ccy
    }

    validateCurrency(this.ccy)
  }

  toString() {
    let dp  = decimalDigits(this.ccy)
    let sym = symbol(this.ccy)
    let val = super.toFixed(dp)

    return `${sym}${val}`
  }
}

const P = BigCurrency.prototype

P.absoluteValue = P.abs = function() {
  let val = op(BigNumber.prototype.abs, this)
  return new BigCurrency(val, this.ccy)
}

P.plus = P.add = function(that) {
  let val = op(BigNumber.prototype.add, this, that)
  return new BigCurrency(val, this.ccy)
}

P.minus = P.sub = function(that) {
  let val = op(BigNumber.prototype.sub, this, that)
  return new BigCurrency(val, this.ccy)
}

P.times = P.mul = function(that) {
  assertNotBigCurrency(that)
  let val = op(BigNumber.prototype.mul, this, that)
  return new BigCurrency(val, this.ccy)
}

P.dividedBy = P.div = function(that) {
  assertNotBigCurrency(that)
  let val = op(BigNumber.prototype.div, this, that)
  return new BigCurrency(val, this.ccy)
}

function op(fn, x, y) {
  if (y instanceof BigCurrency) {
    assertCurrenciesMatch(x.ccy, y.ccy)
  }

  let val = fn.call(x, y)
  return new BigCurrency(val, x.ccy)
}

function decimalDigits(c) {
  return CURRENCIES[c].decimalDigits
}

function symbol(c) {
  return CURRENCIES[c].symbol
}

function validateCurrency(ccy) {
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
