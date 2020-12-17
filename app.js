const express = require('express');
const createError = require('http-errors');

const app = express();
const { middleware, verifyAccessToken } = require('./middlewares');
const route = require('./routes');


// middlewares
middleware(app);

// Routes
app.get('/', verifyAccessToken, (req, res, next) => {
    console.log(req.headers['authorization']);

    res.send('Home page')
})
route(app);

// Handlers errors global
app.use(async (req, res, next) => {
    next(createError.NotFound())
});

app.use((error, req, res, next) => {
    res.statusCode = error.statusCode;
    res.send({
        error: {
            message: error.message
        }
    })
})

module.exports = app;