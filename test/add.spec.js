'use strict'

const expect      = require('chai').expect
const BigNumber   = require('bignumber.js')
const BigCurrency = require('../')

describe('add()', () => {

  it('should throw error on currency missmatch', () => {
    try {
      let x = new BigCurrency(1.01, 'EUR')
      let y = new BigCurrency(2.02, 'USD')
      x.add(y)

    } catch (err) {
      expect(err.message).to.equal('Currency missmatch EUR - USD')
    }
  })

  it('should work for "string" values', () => {
    let x = new BigCurrency(1.01, 'EUR')
    let y = '2.02'
    let c = x.add(y)

    expect(String(c)).to.equal('€3.03')
  })

  it('should work for "number" values', () => {
    let x = new BigCurrency(1.01, 'EUR')
    let y = 2.02
    let c = x.add(y)

    expect(String(c)).to.equal('€3.03')
  })

  it('should work for "BigNumber" values', () => {
    let x = new BigCurrency(1.01, 'EUR')
    let y = new BigNumber(2.02)
    let c = x.add(y)

    expect(String(c)).to.equal('€3.03')
  })

  it('should work for "BigCurrency" values', () => {
    let x = new BigCurrency(1.01, 'EUR')
    let y = new BigCurrency(2.02, 'EUR')
    let c = x.add(y)

    expect(String(c)).to.equal('€3.03')
  })

})
