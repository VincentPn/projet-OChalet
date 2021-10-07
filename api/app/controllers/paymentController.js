const {User, Comment, Message, Booking, Offer} = require('../models');
const {stripe, bill} = require("../services/stripe2")


const paymentController = {

  createPaymentIntent: async (request, response) => {
    try {

      const {offerID, booking_start, booking_end, customer_email} = request.body
      const offer = await Offer.findById(offerID)
      if(!offer) return response.status(400).send("Bad request, no offer with " + offerID)



      const paymentIntent = await stripe.paymentIntents.create({
        amount: offer.price_ht * offer.tax * 100,
        currency: 'eur',
        description: `x1 ${offer.title}`,
        statement_descriptor: `Ochalet-${offer.title}`.substr(0,22),
        metadata: {
          offer_id: offer.id,
          booking_start,
          booking_end
        },
        payment_method_types: ['card'],
        receipt_email: customer_email
      });

      response.json({ clientSecret: paymentIntent.client_secret })

      
     
    } catch(error) {
        response.status(500).send(error.message);
    }
},

    updatePaymentIntent: async (request, response) => {

    },

    deletePaymentIntent: async (request, response) => {
      try {

        const {id} = request.body
        const {status} = await stripe.paymentIntents.cancel(id, {cancellation_reason: "requested_by_customer"});
        response.json(status)

      } catch (error) {
        response.status(500).send(error.message)
      }


    },

    deleteAbandonedPaymentIntent: async (request, response) => {
        try {
          const {data} = await stripe.paymentIntents.list({created: {lt: Date.now() - 1000 * 60 * 60 * 24}})
          
          const cancelableList = data
          .filter(intent => intent.status === "requires_payment_method")
          .map(cancelableIntent => cancelableIntent.id)
          if(!cancelableList.lenght) return response.status(404).send("no payment intent pending")


          for(const cancelableIntent of cancelableList) await stripe.paymentIntents.cancel(cancelableIntent, {cancellation_reason: "abandoned"})
          response.send("Older than 1 day intent's deleted")

        } catch (error) {
          response.status(500).send(error.message)
        }

    }

    

    

    

    

}

module.exports = paymentController;
