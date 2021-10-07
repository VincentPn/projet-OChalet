const Joi = require("joi")
const joiPostalCode = Joi.extend(require('joi-postalcode'))

const now = Date.now();
const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18));

module.exports = {
    signin: Joi.object({
        email: Joi.string().email().trim().required(),
        password: Joi.string().trim().required().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,}$'))
    }),

    signup: Joi.object({
        firstname: Joi.string().max(40).trim().required(),
        lastname: Joi.string().max(40).trim().required(),
        email: Joi.string().email().max(50).trim().lowercase().required(),
        password: Joi.string().trim().required().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,}$')),
        passwordConfirm: Joi.string().trim().required().valid(Joi.ref('password')),
        phone: Joi.string(),
        country: Joi.string()

    }), 

    refresh_token: Joi.object({
      refreshToken: Joi.string().required()
    }),

    reset_password: Joi.object({
      email: Joi.string().email().required()
    }),

    confirm_reset: Joi.object({
      password: Joi.string().trim().required().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,}$')),
      passwordConfirm: Joi.string().trim().required().valid(Joi.ref('password'))
    })

    
   
}
