var TestEx = require('../index.js').default;
var biscointTestex = new TestEx({
    exchange_name: 'Binance', // Exchange Name
    exchange_country: 'US', // Exchange Country
    exchange_url: 'https://binance.com' // Exchange URL
});

biscointTestex.addBuyOperation({
    date: '25/05/2019', // Input Javascript Date Object, 'DD/MM/YYYY', 'DDMMYYYY' as or Unix Timestamp

    brl_value: 'R$ 1500,80', // BRL value trade (don't allow thousands separator)
    brl_fees: 'R$ 1,49', // BRL fee trade (don't allow thousands separator)

    coin_symbol: 'BTC', // CRYPTO symbol (BTC for Bitcoin, ETH for Ethereum)
    coin_quantity: '0.0000001', // CRYPTO quantity (don't allow thousands separator)
});

biscointTestex.addSellOperation({
    date: '25/05/2019', // Input Javascript Date Object, 'DD/MM/YYYY', 'DDMMYYYY' as or Unix Timestamp

    brl_value: 'R$ 1500,80', // BRL value trade (don't allow thousands separator)
    brl_fees: 'R$ 1,49', // BRL fee trade (don't allow thousands separator)

    coin_symbol: 'BTC', // CRYPTO symbol (BTC for Bitcoin, ETH for Ethereum)
    coin_quantity: '0.0000001', // CRYPTO quantity (don't allow thousands separator)
});

biscointTestex.addPermutationOperation({ 
    date: '26/08/2022',
    //brl_fees: '00', // Fees is optional

    received_coin_symbol: 'BTC',
    received_coin_quantity: '0.01',

    delivered_coin_symbol: 'USDT',
    delivered_coin_quantity: '1003.00'
});

biscointTestex.addDepositOperation({
    date: 1564672373,
    brl_fees: 0,

    coin_symbol: 'BTC',
    coin_quantity: 0.000004,
});

biscointTestex.addWithdrawOperation({
    date: 1564672373,
    brl_fees: 0,

    coin_symbol: 'BTC',
    coin_quantity: 0.000004,
});

console.log(biscointTestex.exportFile());

/* console.log output:
0110|25052019|I|150080|149|BTC|00000001000|Binance|https://binance.com|US
0120|25052019|I|150080|149|BTC|00000001000|Binance|https://binance.com|US
0210|26082022|II|000|BTC|00100000000|10030000000000|USDT|Binance|https://binance.com|US
0410|01082019|IV|000|BTC|00000040000|Binance|https://binance.com|US
0510|01082019|V|000|BTC|00000040000|Binance|https://binance.com|US
*/
