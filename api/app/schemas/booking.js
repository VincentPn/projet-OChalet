const Joi = require('joi');


module.exports = {
    
    
    createBooking: Joi.object({
        intentID: Joi.string().token().trim().required(),
        message: Joi.string().trim(),
        
    }),

    updateBooking: Joi.object({
        id: Joi.number().positive().required(),
        reservation_start: Joi.date(),
        reservation_end: Joi.date(),
        message: Joi.string().trim(),
        offer_id: Joi.number().positive().required(),
        reservation_status: Joi.boolean(),
        user_id: Joi.number().positive().required()
    }),

    deleteBooking: Joi.object({
      id: Joi.number().positive().required()
    })


    
}
