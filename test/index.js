const Exchange = require("../index").default
const { expect } = require('chai')
const fs = require('fs')

describe('Exchange', () => {
  const biscointTestex = new Exchange({
    exchange_name: 'BiscointTestex',
    exchange_country: 'US',
    exchange_url: 'https://testex.biscoint.io'
  })

  it('should be instance of exchange', () => {
    expect(biscointTestex).to.be.an.instanceOf(Exchange)
  })

  it('should add buy operation', () => {
    biscointTestex.addBuyOperation({
      date: '25/05/2019',
      brl_value: 'R$ 1500,80',
      brl_fees: 'R$ 1,49',
      coin_symbol: 'BTC',
      coin_quantity: '0.0000001',
    })
  })

  it('should add sell operation', () => {
    biscointTestex.addSellOperation({
      date: '25/05/2019',
      brl_value: 'R$ 1500,80',
      brl_fees: 'R$ 1,49',
      coin_symbol: 'BTC',
      coin_quantity: '0.0000001',
    })
  })

  it('should add permutation operation', () => {
    biscointTestex.addPermutationOperation({
      date: '10/05/2019',

      received_coin_symbol: 'BTC',
      received_coin_quantity: '0.01',

      delivered_coin_symbol: 'USDT',
      delivered_coin_quantity: '1003.00'
    })
  })

  it('should add deposit operation', () => {
    biscointTestex.addDepositOperation({
      date: 1564672373,
      id: 'REALLY_UNIQUE_ID',
      brl_fees: 0,

      coin_symbol: 'BTC',
      coin_quantity: 0.000004,

      origin_wallet: '123123abc456efg'
    })
  })

  it('should add payment receiver operation', () => {
    biscointTestex.addPaymentReceiverOperation({
      date: 1564672373,
      brl_fees: 0,

      coin_symbol: 'BTC',
      coin_quantity: 0.000004,
    })
  })

  it('should add payment payer operation', () => {
    biscointTestex.addPaymentPayerOperation({
      date: 1564672373,
      brl_fees: 0,

      coin_symbol: 'BTC',
      coin_quantity: 0.000004,
    })
  })

  it('should be equal to example-output', () => {
    const example = fs
      .readFileSync('test/example-output')
      .toString()

    const exportedFile = biscointTestex.exportFile();

    const e = expect(
      exportedFile,
    )
    .to.be.a('string')
    .to.equal(example)
  })
})

