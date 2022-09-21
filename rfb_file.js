import moment from 'moment-timezone';

const DEFAULT_TIMEZONE = 'America/Sao_Paulo';

function formatDate(date) {
    return moment.tz(date, DEFAULT_TIMEZONE).format('DDMMYYYY');
}

export function createBuySellOp(obj, type, exchange_data) {
    const line_type = type === "BUY" ? '0110' : '0120';
    const operation_code = 'I';
    const {
        date,
        brl_value,
        brl_fees,
        coin_symbol,
        coin_quantity
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
        delivered_coin_quantity
    } = obj;

    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, '');
    const rfb_received_coin_quantity = received_coin_quantity.toFixed(10).replace(/\./g, '');
    const rfb_delivered_coin_quantity = delivered_coin_quantity.toFixed(10).replace(/\./g, '');

    return `${line_type}|${formatDate(date)}|${operation_code}|${rfb_brl_fees}|${received_coin_symbol}|${rfb_received_coin_quantity}|${rfb_delivered_coin_quantity}|${delivered_coin_symbol}|${exchange_data.exchange_name}|${exchange_data.exchange_url}|${exchange_data.exchange_country}\r\n`;
}

export function createDepositOp(obj, exchange_data) {
    const line_type = '0410';
    const operation_code = 'IV';
    const {
        date,
        brl_fees,

        coin_symbol,
        coin_quantity,

        origin_wallet
    } = obj;

    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, '');
    const rfb_coin_quantity = coin_quantity.toFixed(10).replace(/\./g, '');

    return `${line_type}|${formatDate(date)}|${operation_code}|${rfb_brl_fees}|${coin_symbol}|${rfb_coin_quantity}|${origin_wallet}|${exchange_data.exchange_name}\r\n`;
}

export function createWithdrawOp(obj, exchange_data) {
    const line_type = '0510';
    const operation_code = 'V';
    const {
        date,
        brl_fees,

        coin_symbol,
        coin_quantity
    } = obj;

    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, '');
    const rfb_coin_quantity = coin_quantity.toFixed(10).replace(/\./g, '');

    return `${line_type}|${formatDate(date)}|${operation_code}|${rfb_brl_fees}|${coin_symbol}|${rfb_coin_quantity}|${exchange_data.exchange_name}|${exchange_data.exchange_url}|${exchange_data.exchange_country}\r\n`;
}

export function createPaymentOp(obj, type, exchange_data) {
    const line_type = type === "RECEIVER" ? '0710' : '0720';
    const operation_code = 'VII';
    const {
        date,
        brl_fees,

        coin_symbol,
        coin_quantity,
    } = obj;

    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, '');
    const rfb_coin_quantity = coin_quantity.toFixed(10).replace(/\./g, '');

    return `${line_type}|${formatDate(date)}|${operation_code}|${rfb_brl_fees}|${coin_symbol}|${rfb_coin_quantity}|${exchange_data.exchange_name}|${exchange_data.exchange_url}|${exchange_data.exchange_country}\r\n`;
}