const Joi = require('joi');


module.exports = {
    
    
    createMessage: Joi.object({
        reservation_start: Joi.date(),
        reservation_end: Joi.date(),
        nb_persons: Joi.number().positive(),
        body: Joi.string().trim().required(),
        offer_id: Joi.number().positive().required(),
        message_status: Joi.boolean(),

    }),

    updateMessage: Joi.object({
      id: Joi.number().required(),
      reservation_start: Joi.date(),
      reservation_end: Joi.date(),
      nb_persons: Joi.number().positive(),
      body: Joi.string().trim(),
      offer_id: Joi.number().positive().required(),
      message_status: Joi.boolean(),
      user_id: Joi.number().positive().required()
    }),

    deleteMessage: Joi.object({
      id: Joi.number().positive().required()
    })

    
}
