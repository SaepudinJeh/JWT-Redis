const { postLogin } = require('./auth/login');
const { postSignup } = require('./auth/signup');
const { refreshToken } = require('./auth/refresh_token');
const { logout } = require('./auth/logout');


module.exports = {
    postLogin,
    postSignup,
    refreshToken,
    logout
}