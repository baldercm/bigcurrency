'use strict'

const expect      = require('chai').expect
const BigCurrency = require('../')

describe('toString()', () => {

  it('should work', () => {
    let x = new BigCurrency(1.01, 'EUR')

    expect(x.toString()).to.equal('€1.01')
  })

})
