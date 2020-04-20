const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Printing where is the directory this current application is running from
console.log(__dirname);
// Printing where the application filename it is currently running from
console.log(__filename);

const publicFolder = path.join(__dirname, '../public');
console.log(publicFolder);

const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

const app = express();

// Set the hbs -> dynamic template plugin for express.
// Look up npm hbs from google
app.set('view engine', 'hbs');
// This is to set where the views folder is located.
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// Tell express to use public folder to get index.html, css and images
app.use(express.static(publicFolder));

// app.com
// app.com/help
// app.com/about
// app.com/weather

// This will route the root to index.hbs
// The resp.render will make it route to index.hbs file inside views folder.
// This will require hbs module integration with Express.
app.get('', (req, resp) => {
    resp.render('index', {
        title: 'Weather App',
        name: 'Ronson',
    });
});

// THis will route the localhost:3000/about to about.hbs
app.get('/about', (req, resp) => {
    resp.render('about', {
        title: 'About me',
        name: 'Ronson',
    });
});

// This will route the localhost:3000/help to help.hbs
app.get('/help', (req, resp) => {
    resp.render('help', {
        title: 'Help page',
        helpText: 'This is a help page',
        name: 'Ronson',
    });
});

// This is to route to http://localhost:3000/weather
app.get('/weather', (req, resp) => {
    if (!req.query.address) {
        return resp.send({
            error: 'Address must be provided',
        });
    }
    const addr = req.query.address;

    // Put = {} for the {latitude, longitude, location} so when the geocode cannot
    // be found we don't run into an error cannot destructuring.
    // This is setting a default parameter into an empty object.
    geocode(addr, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return resp.send({
                error: error,
            });
        }
        forecast(latitude, longitude, (error, { weather, description }) => {
            if (error) {
                return resp.send({
                    error,
                });
            }

            resp.send({
                city: location,
                weather: weather,
                description: description,
            });
        });
    });
});

// This will route http://localhost:3000/products?search=games&rating=5
app.get('/products', (req, resp) => {
    if (!req.query.search) {
        // using return to immediately end this and not executing the second resp.send below.
        return resp.send({
            error: 'You must provide a search term',
        });
    }
    console.log(req.query.search);
    resp.send({
        products: [],
    });
});

// This is to catch every unknown under /help url.
app.get('/help/*', (req, resp) => {
    resp.render('404Page', {
        title: '404',
        message: 'Help article not found',
        name: 'Ronson',
    });
});

// This will route everything else that doesn't match the routing above.
app.get('*', (req, resp) => {
    resp.render('404Page', {
        title: '404',
        message: 'Page not found',
        name: 'Ronson',
    });
});

// Run the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

// This will not be executed since we set the static folder above.
// This is to route to http://localhost:3000
// app.get('', (req, resp) => {
//     resp.send('<h1>Weather</h1>');
// });

// app.get('/help', (req, resp) => {
//     resp.send([
//         {
//             name: 'Andrew',
//             age: 32,
//         },
//         {
//             name: 'Sarah',
//             age: 27,
//         },
//     ]);
// });

// This is to route to http://localhost:3000/about url
// app.get('/about', (req, resp) => {
//     resp.send('<h1>About page</h1>');
// });
