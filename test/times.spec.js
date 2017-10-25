'use strict'

const expect      = require('chai').expect
const BigNumber   = require('bignumber.js')
const BigCurrency = require('../')

describe('times()', () => {

  it('should be aliased to mul()', () => {
    expect(BigCurrency.times).to.equal(BigCurrency.mul)
  })

  it('should work for "string" value', () => {
    let x = new BigCurrency(1.01, 'EUR')
    let y = '5.00'
    let c = x.times(y)

    expect(String(c)).to.equal('€5.05')
  })

  it('should work for "number" value', () => {
    let x = new BigCurrency(1.01, 'EUR')
    let y = 5.00
    let c = x.times(y)

    expect(String(c)).to.equal('€5.05')
  })

  it('should work for "BigNumber" value', () => {
    let x = new BigCurrency(1.01, 'EUR')
    let y = new BigNumber(5.00)
    let c = x.times(y)

    expect(String(c)).to.equal('€5.05')
  })

  it('should throw error on null value', () => {
    try {
      let x = new BigCurrency(1.01, 'EUR')
      x.times(null)

      throw new Error('Expecting error')
    } catch (err) {
      expect(err.message).to.equal('times() not a number: null')
    }
  })

  it('should throw error for "BigCurrency" value', () => {
    try {
      let x = new BigCurrency(1.01, 'EUR')
      let y = new BigCurrency(2.02, 'USD')
      x.times(y)

      throw new Error('Expecting error')
    } catch (err) {
      expect(err.message).to.equal('BigCurrency is not allowed for this operation. Use BigNumber, Number or String.')
    }
  })

})
