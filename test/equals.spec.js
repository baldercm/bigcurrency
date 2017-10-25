'use strict'

const expect      = require('chai').expect
const BigCurrency = require('../')

describe('equals()', () => {

  it('should be aliased to eq()', () => {
    expect(BigCurrency.equals).to.equal(BigCurrency.eq)
  })

  it('should return true for BigCurrency values with same value and currency', () => {
    let x   = new BigCurrency(15665.98, 'EUR')
    let y   = new BigCurrency('15665.98', 'EUR')
    let eq  = x.equals(y)

    expect(eq).to.be.true
  })

  it('should return false for non BigCurrency values', () => {
    let x   = new BigCurrency(1.01, 'EUR')
    let y   = '2.02'
    let eq  = x.equals(y)

    expect(eq).to.be.false
  })

  it('should return false for null', () => {
    let x   = new BigCurrency(1.01, 'EUR')
    let eq  = x.equals(null)

    expect(eq).to.be.false
  })

  it('should return false for BigCurrency values with different currency', () => {
    let x   = new BigCurrency(1.01, 'EUR')
    let y   = new BigCurrency('1.01', 'USD')
    let eq  = x.equals(y)

    expect(eq).to.be.false
  })

  it('should return false for BigCurrency values with different value', () => {
    let x   = new BigCurrency(1.01, 'EUR')
    let y   = new BigCurrency('2.02', 'EUR')
    let eq  = x.equals(y)

    expect(eq).to.be.false
  })

})
