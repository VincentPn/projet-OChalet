const Joi = require('joi');

const joiPostalCode = Joi.extend(require('joi-postalcode'))


const now = Date.now();
const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18));

module.exports = {
    
    
    updateUser: Joi.object({
        id: Joi.number().positive(),
        firstname: Joi.string().max(40).trim(),
        lastname: Joi.string().max(40).trim(),
        email: Joi.string().email().max(50).trim().lowercase(),
        phone: Joi.string().max(10).pattern(/(^0)([0-9])+$/),
        birth_date: Joi.date().max(cutoffDate),
        zip_code: joiPostalCode.string().postalCode("FR"),
        city_name: Joi.string().max(50).trim(),
        country: Joi.string().max(40).trim(),
        street_name: Joi.string().trim(),
        street_number: Joi.string().alphanum().max(10).trim(),
        password: Joi.string().trim().regex(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,}$')),
        passwordConfirm: Joi.string().trim().valid(Joi.ref('password')),

    }).and("password", "passwordConfirm"),

    deleteUser: Joi.object({
      id: Joi.number().positive()
    })

    
}

