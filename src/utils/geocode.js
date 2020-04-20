const request = require('request');

const geocode = (address, callback) => {
    const url =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) +
        '.json?access_token=pk.eyJ1Ijoicnd1bmlhcmQiLCJhIjoiY2syMm1zZGp3MDY2bTNobWp1czhiMnFidSJ9.v7SueDI2CrLI_KUDusoi-g';
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback(error, undefined);
        } else if (body.message) {
            callback(body.message, undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find geocode location', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
