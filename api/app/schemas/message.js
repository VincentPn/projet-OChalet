const Joi = require('joi');


module.exports = {
    
    createMessage: Joi.object({
        body: Joi.string().trim().required(),
        offer_id: Joi.number().positive().required(),
    }),

    updateMessage: Joi.object({
      id: Joi.number().required(),
      message_status: Joi.boolean().required(),
    }),

    deleteMessage: Joi.object({
      id: Joi.number().positive().required()
    })

    
}
