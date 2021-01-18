const request = require('request');
exports.getAnime = async (url) => {
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200 && JSON.parse(body).data.length) {
                resolve(JSON.parse(body).data[0].attributes);
            } else {
                resolve(null);
                // reject(error);
            }
        });
    });
};