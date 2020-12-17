const morgan = require('morgan');
const express = require('express');
const {verifyAccessToken} = require('./auth');

module.exports = {
    middleware: (app) => {
        app.use(morgan('dev'));
        app.use(express.json());
        app.use(express.urlencoded({extended:true}))
    },
    verifyAccessToken
};

