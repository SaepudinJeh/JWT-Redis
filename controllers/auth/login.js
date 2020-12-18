const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const postLogin = (req, res, next) => {
    User.login(req.body)
    .then(result => {
        if (result instanceof Error) {
            return next(result)
        };


        const accessToken = jwt.sign({
            _id: result._id,
            email: result.email
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'})

        const refreshToken = jwt.sign({
            _id: result._id,
            email: result.email
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y'})

        res.json({ accessToken, refreshToken })
    })
    .catch(err => next(createError(500)));
};


module.exports = {
    postLogin
};