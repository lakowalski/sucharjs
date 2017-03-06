var _ = require("lodash"),
    Q = require("q"),
    suchar = require('../suchar'),
    SMSAPI = require('smsapi');

/**
 * Put here your unique token generated in the user panel
 * https://ssl.smsapi.pl/oauth/tokens#/oauth/manage
 */
var smsapi = new SMSAPI({
    oauth: {
        accessToken: 'put-here-your-unique-oauth-token'
    }
});

/**
 * send a text message via SMSApi
 * all parameters was described in https://github.com/smsapi/smsapi-javascript-client
 * @param {Object} options
 * @param {String} options.to
 * @param {String} options.message
 * @param {Date} [date] or string/integer
 * @param {Bool} options.test
 * @return {Promise}
 */
function sendMessage(params) {
    return smsapi.message.sms().params(params).execute();
}

/**
 * send a suchar as a text message
 * @param {String} params
 * @return {Promise}
 */
function sendSuchar(params) {
    return suchar()
        .then(message => _.merge(params, { message: message }))
        .then(sendMessage);
};

/**
 * calculate sending datetime
 * @param {Date} referalDate
 * @param {Integer} interval
 * @param {Integer} index
 * @return {Date} 
 */
function calculateDate(refer, interval, i) {
    return new Date(refer.getTime() + i * interval * 1000);
}

/**
 * schedule a text mailing to selected number with selected interval
 * @param {Object}  options
 * @param {Integer} options.times
 * @param {Date}    options.date
 * @param {String}  options.to
 * @param {Bool}    options.test
 * @return {Promise}
 */
function scheduleSucharMailing(params) {
    let interval = params.interval || 0;
    let startDate = params.date || new Date();
    let referalParams = _.omit(params, "times", "interval");

    return Q.all(_.times(params.times, i => {
        let messageParams = _.merge({}, referalParams, {
            date: calculateDate(startDate, interval, i)
        })
        return sendSuchar(messageParams);
    }));
}

// ============================================================================

var params = { 
    to: "605xxxxxx", 
    interval: "60", 
    times: 3,
    from: "Eco",      // Send messages from random number
    normalize: 1,      // Only alphanumeric text in messages
    test: 1
}

scheduleSucharMailing(params)
    .then(result => console.log(JSON.stringify(result, null, 2)))
    .catch(console.error)