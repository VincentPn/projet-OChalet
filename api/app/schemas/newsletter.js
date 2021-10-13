const Joi = require('joi');

module.exports = {
     
    postNewsletter: Joi.object({
        body: Joi.string().trim().required()    
    })
};