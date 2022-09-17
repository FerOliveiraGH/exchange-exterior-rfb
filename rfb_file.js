import moment from 'moment-timezone';

const DEFAULT_TIMEZONE = 'America/Sao_Paulo';

function getIdentityRFB(identity_type){
    return (identity_type === 'CPF') ? 1
    : (identity_type === 'CNPJ') ? 2
    : (identity_type === 'NIF_PF') ? 3
    : (identity_type === 'NIF_PJ') ? 4
    : (identity_type === 'PASSPORT') ? 5
    : (identity_type === 'COUNTRY_NO_ID') ? 6
    : (identity_type === 'USER_NO_ID') ? 7
    : '';
}

function formatDate(date) {
    return moment.tz(date, DEFAULT_TIMEZONE).format('DDMMYYYY');
}

export function createHeader(obj) {
    const line_type = '0000';
    const { exchange_name, exchange_country, exchange_url } = obj;

    return `${line_type}|${exchange_country}|${exchange_name}|${exchange_url}\r\n`;
}

export function createFooter(obj) {
    const line_type = '9999';
    const { buySellQuantity, permutationQuantity, depositQuantity, withdrawQuantity, paymentQuantity, otherQuantity, buySellTotal, balanceReportQuantity } = obj;

    const rfb_buySellTotal = Number(buySellTotal).toFixed(2).replace(/\./g, '');
    return `${line_type}|${buySellQuantity}|${rfb_buySellTotal}|${permutationQuantity}|${depositQuantity}|${withdrawQuantity}|${paymentQuantity}|${otherQuantity}|${balanceReportQuantity}\r\n`;
}

export function createBuySellOp(obj, type, exchange_data) {
    const line_type = type === "BUY" ? '0110' : '0120';
    const operation_code = 'I';
    const {
        date,
        brl_value,
        brl_fees,
        coin_symbol,
        coin_quantity,
    } = obj;

    const rfb_brl_value = brl_value.toFixed(2).replace(/\./g, '');
    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, '');
    const rfb_coin_quantity = coin_quantity.toFixed(10).replace(/\./g, '');

    return `${line_type}|${formatDate(date)}|${operation_code}|${rfb_brl_value}|${rfb_brl_fees}|${coin_symbol}|${rfb_coin_quantity}|${exchange_data.exchange_name}|${exchange_data.exchange_url}|${exchange_data.exchange_country}\r\n`;
}

export function createPermutationOp(obj, exchange_data) {
    const line_type = '0210';
    const operation_code = 'II';
    const {
        date,
        brl_fees,

        received_coin_symbol,
        received_coin_quantity,

        delivered_coin_symbol,
        delivered_coin_quantity,
    } = obj;

    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, '');
    const rfb_received_coin_quantity = received_coin_quantity.toFixed(10).replace(/\./g, '');
    const rfb_delivered_coin_quantity = delivered_coin_quantity.toFixed(10).replace(/\./g, '');

    return `${line_type}|${formatDate(date)}|${operation_code}|${rfb_brl_fees}|${received_coin_symbol}|${rfb_received_coin_quantity}|${rfb_delivered_coin_quantity}|${delivered_coin_symbol}|${exchange_data.exchange_name}|${exchange_data.exchange_url}|${exchange_data.exchange_country}\r\n`;
}

export function createDepositOp(obj) {
    const line_type = '0410';
    const operation_code = 'IV';
    const {
        date,
        id,
        brl_fees,

        coin_symbol,
        coin_quantity,

        identity_type,
        country,
        document,
        fullname,
        address,
    } = obj;

    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, '');
    const rfb_coin_quantity = coin_quantity.toFixed(10).replace(/\./g, '');

    const rfb_identity_type = getIdentityRFB(identity_type);

    const rfb_cpf = (document && [1,2].includes(rfb_identity_type)) ? document.match(/\d+/g).join('') : '';
    const rfb_nif = (document && [3,4,5].includes(rfb_identity_type)) ? document : '';

    return `${line_type}|${formatDate(date)}|${id}|${operation_code}|${rfb_brl_fees}|${coin_symbol}|${rfb_coin_quantity}|${rfb_identity_type}|${country}|${rfb_cpf}|${rfb_nif}|${fullname}|${address}\r\n`;
}

export function createWithdrawOp(obj) {
    const line_type = '0510';
    const operation_code = 'V';
    const {
        date,
        id,
        brl_fees,

        coin_symbol,
        coin_quantity,

        identity_type,
        country,
        document,
        fullname,
        address,
    } = obj;

    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, '');
    const rfb_coin_quantity = coin_quantity.toFixed(10).replace(/\./g, '');

    const rfb_identity_type = getIdentityRFB(identity_type);

    const rfb_cpf = (document && [1,2].includes(rfb_identity_type)) ? document.match(/\d+/g).join('') : '';
    const rfb_nif = (document && [3,4,5].includes(rfb_identity_type)) ? document : '';

    return `${line_type}|${formatDate(date)}|${id}|${operation_code}|${rfb_brl_fees}|${coin_symbol}|${rfb_coin_quantity}|${rfb_identity_type}|${country}|${rfb_cpf}|${rfb_nif}|${fullname}|${address}\r\n`;
}

export function createPaymentOp(obj) {
    const line_type = '0710';
    const operation_code = 'VII';
    const {
        date,
        id,
        brl_fees,

        coin_symbol,
        coin_quantity,

        payer_identity_type,
        payer_country,
        payer_document,
        payer_fullname,
        payer_address,

        receiver_identity_type,
        receiver_country,
        receiver_document,
        receiver_fullname,
        receiver_address,
    } = obj;

    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, '');
    const rfb_coin_quantity = coin_quantity.toFixed(10).replace(/\./g, '');

    const rfb_payer_identity_type = getIdentityRFB(payer_identity_type);
    const rfb_receiver_identity_type = getIdentityRFB(receiver_identity_type);

    const rfb_payer_cpf = (payer_document && [1,2].includes(rfb_payer_identity_type)) ? payer_document.match(/\d+/g).join('') : '';
    const rfb_payer_nif = (payer_document && [3,4,5].includes(rfb_payer_identity_type)) ? payer_document : '';

    const rfb_receiver_cpf = (receiver_document && [1,2].includes(rfb_receiver_identity_type)) ? receiver_document.match(/\d+/g).join('') : '';
    const rfb_receiver_nif = (receiver_document && [3,4,5].includes(rfb_receiver_identity_type)) ? receiver_document : '';

    return `${line_type}|${formatDate(date)}|${id}|${operation_code}|${rfb_brl_fees}|${coin_symbol}|${rfb_coin_quantity}|${rfb_payer_identity_type}|${payer_country}|${rfb_payer_cpf}|${rfb_payer_nif}|${payer_fullname}|${payer_address}|${rfb_receiver_identity_type}|${receiver_country}|${rfb_receiver_cpf}|${rfb_receiver_nif}|${receiver_fullname}|${receiver_address}\r\n`;
}

export function createOtherOp(obj) {
    const line_type = '0910';
    const operation_code = 'IX';
    const {
        date,
        id,
        brl_fees,

        coin_symbol,
        coin_quantity,

        origin_identity_type,
        origin_country,
        origin_document,
        origin_fullname,
        origin_address,

        recipient_identity_type,
        recipient_country,
        recipient_document,
        recipient_fullname,
        recipient_address,
    } = obj;

    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, '');
    const rfb_coin_quantity = coin_quantity.toFixed(10).replace(/\./g, '');

    const rfb_origin_identity_type = getIdentityRFB(origin_identity_type);
    const rfb_recipient_identity_type = getIdentityRFB(recipient_identity_type);

    const rfb_origin_cpf = (origin_document && [1,2].includes(rfb_origin_identity_type)) ? origin_document.match(/\d+/g).join('') : '';
    const rfb_origin_nif = (origin_document && [3,4,5].includes(rfb_origin_identity_type)) ? origin_document : '';

    const rfb_recipient_cpf = (recipient_document && [1,2].includes(rfb_recipient_identity_type)) ? recipient_document.match(/\d+/g).join('') : '';
    const rfb_recipient_nif = (recipient_document && [3,4,5].includes(rfb_recipient_identity_type)) ? recipient_document : '';

    return `${line_type}|${formatDate(date)}|${id}|${operation_code}|${rfb_brl_fees}|${coin_symbol}|${rfb_coin_quantity}|${rfb_origin_identity_type}|${origin_country}|${rfb_origin_cpf}|${rfb_origin_nif}|${origin_fullname}|${origin_address}|${rfb_recipient_identity_type}|${recipient_country}|${rfb_recipient_cpf}|${rfb_recipient_nif}|${recipient_fullname}|${recipient_address}\r\n`;
}

export function createBalanceReportData(obj) {
    const line_type_1 = '1000';
    const line_type_2 = '1010';
    const {
        date,

        identity_type,
        country,
        document,
        fullname,
        address,

        fiat_balance,

        coin_symbol: old_coin_symbol,
        coin_balance: old_coin_balance,
    } = obj;

    let { coin_balances } = obj;

    if (!coin_balances) coin_balances = [];

    if (old_coin_symbol && old_coin_balance) {
        coin_balances.push({
            coin_symbol: old_coin_symbol,
            coin_balance: old_coin_balance,
        });
    }

    const rfb_fiat_balance = fiat_balance.toFixed(2).replace(/\./g, '');

    const rfb_identity_type = getIdentityRFB(identity_type);

    const rfb_cpf = (document && [1,2].includes(rfb_identity_type)) ? document.match(/\d+/g).join('') : '';
    const rfb_nif = (document && [3,4,5].includes(rfb_identity_type)) ? document : '';

    let returnString = `${line_type_1}|${formatDate(date)}|${rfb_identity_type}|${country}|${rfb_cpf}|${rfb_nif}|${fullname}|${address}|${rfb_fiat_balance}\r\n`;

    for (const { coin_symbol, coin_balance } of coin_balances) {
        const rfb_coin_balance = coin_balance.toFixed(10).replace(/\./g, '');

        returnString += `${line_type_2}|${coin_symbol}|${rfb_coin_balance}|\r\n`;
    }
    return returnString;
}