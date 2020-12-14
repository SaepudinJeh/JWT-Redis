const express = require('express');
const createError = require('http-errors');

const app = express();
const middleware = require('./middlewares');
const route = require('./routes');


// middlewares
middleware(app);

// Routes
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