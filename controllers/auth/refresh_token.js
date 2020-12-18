const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const { verifyRefreshToken } = require('../../middlewares');

const refreshToken = (req, res, next) => {

    try {
        const { refreshToken } = req.body;
        if (! refreshToken ) return next(createError.BadRequest())
    
        verifyRefreshToken( refreshToken ).then(result => {
            const accessToken = jwt.sign(  {result} , process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'})
    
            const refToken = jwt.sign( {result}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y'})
    
            res.json({ accessToken: accessToken, refreshToken: refToken }) 
        });


    } catch (err) {
        next(createError.Unauthorized())
    }

};


module.exports = {
    refreshToken
};