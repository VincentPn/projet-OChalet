const Joi = require("joi")

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
    }), 

    reset_password: Joi.object({
      email: Joi.string().email().required()
    }),

    confirm_reset: Joi.object({
      password: Joi.string().trim().required().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,}$')),
      passwordConfirm: Joi.string().trim().required().valid(Joi.ref('password')),
      resetPasswordToken: Joi.string().required()
    })
};
