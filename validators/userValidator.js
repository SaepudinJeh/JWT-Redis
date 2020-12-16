const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')).message('You password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character').required()
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});


module.exports = {
    userSchema,
    loginSchema
};