const { Unauthorized } = require('http-errors');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports = {
    verifyAccessToken: (req, res, next) => {
        if (!req.get('Authorization')) {
            next(createError(Unauthorized()))
        }
    
        const token = req.get('Authorization').split(' ')[1];
    
        try {
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
            req.user = { _id: decode._id, email: decode.email};
    
            next()
        } catch (err) {
            next(createError(401));
        }
    }
}