const { Router } = require('express');

const { postSignup, postLogin, refreshToken, logout} = require('../controllers');

const router = Router();

router
    .post('/signup', postSignup)
    .post('/login', postLogin)
    .post('/refresh-token', refreshToken)
    .delete('/logout', logout)

module.exports = router;