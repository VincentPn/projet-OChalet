const {Booking, User, Offer} = require('../models');
const sendMail = require("../services/nodemailer");
const bookingMailTemplate = require('../utils/email-templates/bookingTemplate');
const stripe = require("stripe")(process.env.STRIPE_TEST_PRIVATE_KEY)
const dayjs = require("dayjs")

const bookingController = {

    findAll: async (_, response) => {
        try {
            const bookings = await Booking.findAll();

            for(const booking of bookings){
              for(const field in booking){
                if(!booking[field] && field !== "reservation_status") delete booking[field];
              }
            };
            
            response.json(bookings);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    findByUserId: async (request, response) => {
      try {
          const bookings = await Booking.findByUserId(parseInt(request.token.id, 10));

          for(const booking of bookings){
            if(!booking.message) delete booking.message
          };
          
          response.json(bookings);
      } catch(error) {
          response.status(500).send(error.message);
      }
    },


    create: async (request, response) => {
        try {
          
          
          const { intentID } = request.body;
          const { status, metadata } = await stripe.paymentIntents.retrieve(intentID);
          const { booking_start, booking_end, offer_id, email } = metadata;
          const { id } = request.token;

          if(status !== 'succeeded') return response.status(401).send({message: "payment status not succeed"});
  
          const bookingData = {
            user_id: id,
            reservation_start: new Date(booking_start * 1000),
            reservation_end: new Date(booking_end * 1000),
            offer_id
          }

          
          const newBooking = await new Booking(bookingData).create();
          const user = await User.findById(id);
          const offer = await Offer.findById(offer_id);

          newBooking.reservation_start = dayjs(newBooking.reservation_start).format("YYYY-MM-DD")
          newBooking.reservation_end = dayjs(newBooking.reservation_end).format("YYYY-MM-DD")
          
          const emailBody = bookingMailTemplate(user, newBooking, offer);
          await sendMail(email, "Booking", emailBody);
          
  
          response.status(201).json(newBooking);
  
        } catch (error) {
            response.status(500).send(error.message);
        }
      },

    update: async (request, response) => {
        try {
        
          await new Booking(request.body).update()
          response.status(204).send("booking updated");

      } catch (error) {
          response.status(500).send(error.message);
      }
    },

    delete: async (request, response) => {
        try {
            const bookingID = parseInt(request.query.id, 10);
            const bookingDelete = await Booking.delete(bookingID);
            if(!bookingDelete) return response.status(404).send({error: `Booking with id: ${bookingID} not found`})
            response.status(200).json(`booking with id ${bookingID} deleted`);
        } catch(error) {
            response.status(500).send(error.message);
        }
    }

}

module.exports = bookingController;
