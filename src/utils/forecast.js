const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url =
        'http://api.weatherstack.com/current?access_key=a7a3d12ffc29aed9c8100c1743ffe6d4&query=' +
        longitude +
        ',' +
        latitude +
        '3&units=f';

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback(error, undefined);
        } else if (body.success === false) {
            callback(body.error, undefined);
        } else {
            const currentTemp = body.current.temperature;
            const feelTemp = body.current.feelslike;
            const description = body.current.weather_descriptions[0];
            const humidity = body.current.humidity;
            callback(undefined, {
                weather: 'Weather: ' + description,
                description:
                    'It is currently ' + currentTemp + ' degrees out. It feels like ' + feelTemp + ' degrees out.',
                humidity: 'Current Humidity: ' + humidity + '%',
            });
        }
    });
};

module.exports = forecast;
