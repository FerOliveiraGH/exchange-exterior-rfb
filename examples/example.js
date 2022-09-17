var TestEx = require('../index.js').default;
var biscointTestex = new TestEx({
    exchange_name: 'Binance', // Exchange Name
    exchange_country: 'US', // Exchange Country
    exchange_url: 'https://binance.com' // Exchange URL
});

biscointTestex.addBuySellOperation({ 
    date: '25/05/2019', // Input Javascript Date Object, 'DD/MM/YYYY', 'DDMMYYYY' as or Unix Timestamp
    id: 'a12345', // Operation Id in your exchange
    brl_value: 'R$ 1500,80', // BRL value trade (don't allow thousands separator)
    brl_fees: 'R$ 1,49', // BRL fee trade (don't allow thousands separator)
    coin_symbol: 'BTC', // CRYPTO symbol (BTC for Bitcoin, ETH for Ethereum)
    coin_quantity: '0.0000001', // CRYPTO quantity (don't allow thousands separator)
    
    buyer_identity_type: 'CPF', // Document Type. Allowed: CPF, CNPJ, NIF_PF, NIF_PJ, PASSPORT, COUNTRY_NO_ID and USER_NO_ID
    buyer_country: 'BR', // Country code
    buyer_document: '442.467.420-74', // Document number
    buyer_fullname: 'NOME COMPLETO', // Full name
    buyer_address: 'Rua Nao Existente QD 0 LT 0', // Full address

    seller_identity_type: 'CPF', // Document Type. Allowed: CPF, CNPJ, NIF_PF, NIF_PJ, PASSPORT, COUNTRY_NO_ID and USER_NO_ID
    seller_country: 'BR', // Country code
    seller_document: '438.089.600-51', // Document number
    seller_fullname: 'NOME COMPLETO', // Full name
    seller_address: 'Rua Nao Existente QD 0 LT 0', // Full address
});

biscointTestex.addPermutationOperation({ 
    date: '26/08/2022',
    //brl_fees: '00', // Fees is optional

    received_coin_symbol: 'BTC',
    received_coin_quantity: '0.01',

    delivered_coin_symbol: 'USDT',
    delivered_coin_quantity: '1003.00',

    exchange_name: 'Binance',
    exchange_url: 'https://binance.com',
    exchange_country: 'US',
});

biscointTestex.addDepositOperation({
    date: 1564672373,
    id: 'REALLY_UNIQUE_ID',
    brl_fees: 0,

    coin_symbol: 'BTC',
    coin_quantity: 0.000004,

    identity_type: 'CNPJ',
    country: 'BR',
    //document: '',
    fullname: 'CASA DE CAMBIO',
    //address,
});

console.log(biscointTestex.exportFile());

/* console.log output:
0000|17869530000173|BiscointTestex|https://testex.biscoint.io
0110|25052019|a12345|I|150080|149|BTC|00000001000|1|BR|44246742074||NOME COMPLETO|Rua Nao Existente QD 0 LT 0|1|BR|43808960051||NOME COMPLETO|Rua Nao Existente QD 0 LT 0
0210|10052019||II|000|BTC|00100000000|1|BR|||CR. HOLYVEYRAH|RUA DAS PIRAMIDES, QD 10, LT 17|USDT|10030000000000|4|US|||BITEX EXCHANGE|
0410|01082019|REALLY_UNIQUE_ID|IV|000|BTC|00000040000|2|BR|||CASA DE CAMBIO|
9999|1|150080|1|1|0|0|0|0
*/
