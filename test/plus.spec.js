'use strict'

const expect      = require('chai').expect
const BigNumber   = require('bignumber.js')
const BigCurrency = require('../')

describe('plus()', () => {

  it('should be aliased to add()', () => {
    expect(BigCurrency.plus).to.equal(BigCurrency.add)
  })

  it('should work for "string" value', () => {
    let x = new BigCurrency(1.01, 'EUR')
    let y = '2.02'
    let c = x.plus(y)

    expect(String(c)).to.equal('€3.03')
  })

  it('should work for "number" value', () => {
    let x = new BigCurrency(1.01, 'EUR')
    let y = 2.02
    let c = x.plus(y)

    expect(String(c)).to.equal('€3.03')
  })

  it('should work for "BigNumber" value', () => {
    let x = new BigCurrency(1.01, 'EUR')
    let y = new BigNumber(2.02)
    let c = x.plus(y)

    expect(String(c)).to.equal('€3.03')
  })

  it('should work for "BigCurrency" value', () => {
    let x = new BigCurrency(1.01, 'EUR')
    let y = new BigCurrency(2.02, 'EUR')
    let c = x.plus(y)

    expect(String(c)).to.equal('€3.03')
  })

  it('should throw error on null value', () => {
    try {
      let x = new BigCurrency(1.01, 'EUR')
      x.plus(null)

      throw new Error('Expecting error')
    } catch (err) {
      expect(err.message).to.equal('plus() not a number: null')
    }
  })

  it('should throw error on currency missmatch', () => {
    try {
      let x = new BigCurrency(1.01, 'EUR')
      let y = new BigCurrency(2.02, 'USD')
      x.plus(y)

      throw new Error('Expecting error')
    } catch (err) {
      expect(err.message).to.equal('Currency missmatch EUR - USD')
    }
  })

})
