var Q = require("q"),
    cheerio = require('cheerio'),
    request = require("request"),
    getRequest = Q.nfbind(request.get);

module.exports = function(cb) {
    return getRequest("http://piszsuchary.pl/losuj").spread((res, body) => {
        if(res.statusCode !== 200) {
            return Q.reject("Can not download a suchar!");
        }
        let $ = cheerio.load(body);
        return $(".cytat div a img").first().attr('alt');
    })
};