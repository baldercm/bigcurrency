'use strict'

const expect      = require('chai').expect
const BigCurrency = require('../')

describe('absoluteValue()', () => {

  it('should be aliased to abs()', () => {
    expect(BigCurrency.plus).to.equal(BigCurrency.abs)
  })

  it('should work for positive values', () => {
    let x = new BigCurrency('321.01', 'EUR')
    let c = x.absoluteValue()

    expect(String(c)).to.equal('€321.01')
  })

  it('should work for negative values', () => {
    let x = new BigCurrency('-321.01', 'EUR')
    let c = x.absoluteValue()

    expect(String(c)).to.equal('€321.01')
  })

})
