'use strict'

const expect      = require('chai').expect
const BigNumber   = require('bignumber.js')
const BigCurrency = require('../')

describe('new BigCurrency()', () => {

  it('should throw error on missing currency', () => {
    try {
      new BigCurrency('1.00', null)
    } catch (err) {
      expect(err.message).to.equal('Missing currency')
    }
  })

  it('should throw error on invalid currency', () => {
    try {
      new BigCurrency('1.00', 'ZZZ')
    } catch (err) {
      expect(err.message).to.equal('Invalid currency ZZZ')
    }
  })

  it('should work for "string" values', () => {
    let x = '1.01'
    let c = new BigCurrency(x, 'EUR')
    expect(c.ccy).to.equal('EUR')
    expect(c).to.be.an.instanceof(BigNumber)
  })

  it('should work for "number" values', () => {
    let x = 1.01
    let c = new BigCurrency(x, 'EUR')
    expect(c.ccy).to.equal('EUR')
    expect(c).to.be.an.instanceof(BigNumber)
  })

  it('should work for "BigNumber" values', () => {
    let x = new BigNumber(1.01)
    let c = new BigCurrency(x, 'EUR')
    expect(c.ccy).to.equal('EUR')
    expect(c).to.be.an.instanceof(BigNumber)
  })

  it('should work for "BigCurrency" values and copy currency', () => {
    let x = new BigCurrency(1.01, 'EUR')
    let c = new BigCurrency(x)
    expect(c.ccy).to.equal('EUR')
    expect(c).to.be.an.instanceof(BigNumber)
  })

  it('should work for "BigCurrency" values and overwrite currency', () => {
    let x = new BigCurrency(1.01, 'EUR')
    let c = new BigCurrency(x, 'USD')
    expect(c.ccy).to.equal('USD')
    expect(c).to.be.an.instanceof(BigNumber)
  })

})
