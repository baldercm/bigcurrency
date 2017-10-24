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

  add(that) {
    let val = op(BigNumber.prototype.add, this, that)
    return new BigCurrency(val, this.ccy)
  }

  toString() {
    let dp  = decimalDigits(this.ccy)
    let sym = symbol(this.ccy)
    let val = super.toFixed(dp)

    return `${sym}${val}`
  }
}

function op(fn, x, y) {
  if (y instanceof BigCurrency) {
    checkCurrenciesMatch(x.ccy, y.ccy)
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

function checkCurrenciesMatch(ccy1, ccy2) {
  if (ccy1 !== ccy2) {
    throw new Error(`Currency missmatch ${ccy1} - ${ccy2}`)
  }
}

module.exports = BigCurrency
