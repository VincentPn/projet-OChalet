const {Booking, User, Offer} = require('../models');
const sendMail = require("../services/nodemail")
const bookingMailTemplate = require('../utils/email-templates/bookingTemplate')
const {stripe} = require('../services/stripe2')

const bookingController = {

    findAll: async (_, response) => {
        try {
            const bookings = await Booking.findAll();
            for(const booking of bookings) {
              
              for(const field in booking) !booking[field] ? delete booking[field] : null
              
            }
            response.json(bookings);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    findByUserId: async (request, response) => {
      try {
          const booking = await Booking.findByUserId(parseInt(request.token.id, 10));
          response.json(booking);
      } catch(error) {
          response.status(500).send(error.message);
      }
    },


    create: async (request, response) => {
        try {
          
          const {intentID} = request.body
          const {status, metadata} = await stripe.paymentIntents.retrieve(intentID);
          const {booking_start, booking_end, offer_id} = metadata
          const {id} = request.token
          
          if(status !== 'succeeded') return response.status(401).send({message: "payment status not succeed"})
  
          const bookingData = {
            user_id: request.token.id,
            reservation_start: booking_start,
            reservation_end: booking_end,
            offer_id: offer_id,
            user_id: id
          }
          
          const newBooking = await new Booking(bookingData).create()
          const user = await User.findById(id)
          const offer = await Offer.findById(offer_id)
          
       
          const emailBody = bookingMailTemplate(user, newBooking, offer)
          await sendMail("ochaleto@gmail.com", "Booking", emailBody)
          
  
          response.status(201).json(newBooking);
  
        } catch (error) {
            response.status(500).send(error.message);
        }
      },

    update: async (request, response) => {
        try {
        
          await new Booking(request.body).update()
            response.status(204).json('Update done');

    } catch (error) {
            response.status(500).send(error.message);
    }
    },

    delete: async (request, response) => {
        try {
            const bookingID = parseInt(request.query.id, 10);
            await Booking.delete(bookingID);
            response.status(200).json(`booking with id ${bookingID} deleted`);
        } catch(error) {
            response.status(500).send(error.message);
        }
    }

}

module.exports = bookingController;
