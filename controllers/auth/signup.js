const postSignup = (req, res, next) => {
    console.log(req.body);
    res.send('Signup page!');
};


module.exports = {
    postSignup
};