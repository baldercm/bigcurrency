'use strict'

const expect      = require('chai').expect
const BigNumber   = require('bignumber.js')
const BigCurrency = require('../')

describe('new BigCurrency()', () => {

  it('should work for "string" value', () => {
    let x = '1.01'
    let c = new BigCurrency(x, 'EUR')
    expect(c.ccy).to.equal('EUR')
    expect(c).to.be.an.instanceof(BigNumber)
  })

  it('should work for "number" value', () => {
    let x = 1.01
    let c = new BigCurrency(x, 'EUR')
    expect(c.ccy).to.equal('EUR')
    expect(c).to.be.an.instanceof(BigNumber)
  })

  it('should work for "BigNumber" value', () => {
    let x = new BigNumber(1.01)
    let c = new BigCurrency(x, 'EUR')
    expect(c.ccy).to.equal('EUR')
    expect(c).to.be.an.instanceof(BigNumber)
  })

  it('should work for "BigCurrency" value and copy currency', () => {
    let x = new BigCurrency(1.01, 'EUR')
    let c = new BigCurrency(x)
    expect(c.ccy).to.equal('EUR')
    expect(c).to.be.an.instanceof(BigNumber)
  })

  it('should work for "BigCurrency" value and overwrite currency', () => {
    let x = new BigCurrency(1.01, 'EUR')
    let c = new BigCurrency(x, 'USD')
    expect(c.ccy).to.equal('USD')
    expect(c).to.be.an.instanceof(BigNumber)
  })

  it('should throw error on null value', () => {
    try {
      new BigCurrency(null, 'EUR')

      throw new Error('Expecting error')
    } catch (err) {
      expect(err.message).to.equal('new BigNumber() not a number: null')
    }
  })

  it('should throw error on missing currency', () => {
    try {
      new BigCurrency('1.00', null)

      throw new Error('Expecting error')
    } catch (err) {
      expect(err.message).to.equal('Missing currency')
    }
  })

  it('should throw error on invalid currency', () => {
    try {
      new BigCurrency('1.00', 'ZZZ')

      throw new Error('Expecting error')
    } catch (err) {
      expect(err.message).to.equal('Invalid currency ZZZ')
    }
  })

})
