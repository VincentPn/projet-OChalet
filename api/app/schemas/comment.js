const Joi = require('joi');


module.exports = {
    
    
    saveComment: Joi.object({
        id: Joi.number(),
        body: Joi.string().trim().required(),
        note: Joi.number().min(0).max(5).positive().required(),
        offer_id: Joi.number().positive().required()
    }),

    deleteComment: Joi.object({
      id: Joi.number().positive().required()
    })

    
}

