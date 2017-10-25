'use strict'

const expect      = require('chai').expect
const BigNumber   = require('bignumber.js')
const BigCurrency = require('../')

describe('dividedBy()', () => {

  it('should be aliased to div()', () => {
    expect(BigCurrency.dividedBy).to.equal(BigCurrency.div)
  })

  it('should work for "string" value', () => {
    let x = new BigCurrency('55.99', 'EUR')
    let y = '5.00'
    let c = x.dividedBy(y)

    expect(String(c)).to.equal('€11.20')
  })

  it('should work for "number" value', () => {
    let x = new BigCurrency('55.99', 'EUR')
    let y = 5.00
    let c = x.dividedBy(y)

    expect(String(c)).to.equal('€11.20')
  })

  it('should work for "BigNumber" value', () => {
    let x = new BigCurrency('55.99', 'EUR')
    let y = new BigNumber(5.00)
    let c = x.dividedBy(y)

    expect(String(c)).to.equal('€11.20')
  })

  it('should throw error on null value', () => {
    try {
      let x = new BigCurrency('55.99', 'EUR')
      x.dividedBy(null)

      throw new Error('Expecting error')
    } catch (err) {
      expect(err.message).to.equal('div() not a number: null')
    }
  })

  it('should throw error for "BigCurrency" value', () => {
    try {
      let x = new BigCurrency('55.99', 'EUR')
      let y = new BigCurrency(2.02, 'USD')
      x.dividedBy(y)

      throw new Error('Expecting error')
    } catch (err) {
      expect(err.message).to.equal('BigCurrency is not allowed for this operation. Use BigNumber, Number or String.')
    }
  })

})
