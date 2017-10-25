'use strict'

const expect      = require('chai').expect
const BigNumber   = require('bignumber.js')
const BigCurrency = require('../')

describe('minus()', () => {

  it('should be aliased to sub()', () => {
    expect(BigCurrency.minus).to.equal(BigCurrency.sub)
  })

  it('should work for "string" value', () => {
    let x = new BigCurrency(4.57, 'EUR')
    let y = '2.02'
    let c = x.minus(y)

    expect(String(c)).to.equal('€2.55')
  })

  it('should work for "number" value', () => {
    let x = new BigCurrency(4.57, 'EUR')
    let y = 2.02
    let c = x.minus(y)

    expect(String(c)).to.equal('€2.55')
  })

  it('should work for "BigNumber" value', () => {
    let x = new BigCurrency(4.57, 'EUR')
    let y = new BigNumber(2.02)
    let c = x.minus(y)

    expect(String(c)).to.equal('€2.55')
  })

  it('should work for "BigCurrency" value', () => {
    let x = new BigCurrency(4.57, 'EUR')
    let y = new BigCurrency(2.02, 'EUR')
    let c = x.minus(y)

    expect(String(c)).to.equal('€2.55')
  })

  it('should throw error on null value', () => {
    try {
      let x = new BigCurrency(4.57, 'EUR')
      x.minus(null)

      throw new Error('Expecting error')
    } catch (err) {
      expect(err.message).to.equal('minus() not a number: null')
    }
  })

  it('should throw error on currency missmatch', () => {
    try {
      let x = new BigCurrency(4.57, 'EUR')
      let y = new BigCurrency(2.02, 'USD')
      x.minus(y)

      throw new Error('Expecting error')
    } catch (err) {
      expect(err.message).to.equal('Currency missmatch EUR - USD')
    }
  })

})
