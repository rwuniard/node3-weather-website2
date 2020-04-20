console.log('Client side javascript file is loaded');

// Get weather forecast.
// The result will be put into a callback function.
const getWeatherForecast = (location, callback) => {
    // Use the relative instead of http://localhost:3000/weather?address=
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                callback(data.error, undefined);
            } else {
                callback(undefined, data);
            }
        });
    });
};

// Get the form element.
const weatherForm = document.querySelector('form');
// Get the search input element.
const searchElement = document.querySelector('input');

const messageOne = document.querySelector('#message-one');
const messageWeather = document.querySelector('#message-weather');
const messageDescription = document.querySelector('#message-description');

// Add the submit event listener from the form.
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = searchElement.value;
    getWeatherForecast(location, (error, { city, weather, description } = {}) => {
        if (error) {
            console.log(error);
            messageOne.textContent = error;
            messageWeather.textContent = '';
            messageDescription.textContent = '';
        } else {
            messageOne.textContent = city;
            messageWeather.textContent = weather;
            messageDescription.textContent = description;
            console.log(city);
            console.log(weather);
            console.log(description);
        }
    });
});
