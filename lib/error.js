'use strict'

class BigCurrencyError extends Error {
  constructor({code, message}) {
    super()
    this.code     = code
    this.message  = message
  }
}

class CurrencyMissmatchError extends Error {
  constructor({code, message}) {
    super()
    this.code     = code
    this.message  = message
  }
}

exports.BigCurrencyError        = BigCurrencyError
exports.CurrencyMissmatchError  = CurrencyMissmatchError
