const createError = require('http-errors');

const { User } = require('../../models');

const postSignup = (req, res, next) => {
    const user = new User(req.body);

    user.save((err) => {
        if (err) return next(createError(409)); 
    })

    res.status(201).json({
        message: 'User successfuly created'
    })
};


module.exports = {
    postSignup
};