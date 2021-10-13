const {Offer} = require('../models');
const {createPaymentIntent, deletePaymentIntent} = require("../services/stripe");


const paymentController = {

  createPaymentIntent: async (request, response) => {
    try {

      const {offerID, booking_start, booking_end, customer_email} = request.body;
      const offer = await Offer.findById(offerID);
      if(!offer) return response.status(400).send("Bad request, no offer with " + offerID);

      const {client_secret} = await createPaymentIntent(
        {
          ...offer, 
          booking_start, 
          booking_end, 
          customer_email}
      );
      if(!client_secret) throw new Error("Stripe error, payment intent not created");
    
      response.json({ clientSecret: client_secret });

    } catch(error) {
        response.status(500).send(error.message);
    }
},

    updatePaymentIntent: async (request, response) => {

    },

    deletePaymentIntent: async (request, response) => {
      try {

        const {intentID} = request.body;
        await deletePaymentIntent(intentID);
        response.json({message: `payment intent with id: ${intentID} status is now: canceled`});

      } catch (error) {
        response.status(500).send(error.message);
      }


    }
}

module.exports = paymentController;
