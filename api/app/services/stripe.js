
const stripe = require("stripe")(process.env.STRIPE_TEST_PRIVATE_KEY)

module.exports = {
  createPaymentIntent: async (obj) => {
    
    try {
      const tax = Number(`1.${obj.tax}`)
      return await stripe.paymentIntents.create({
        amount: obj.price_ht * tax * 100,
        currency: 'eur',
        description: obj.title,
        statement_descriptor: `Ochalet-${obj.title}`.substr(0,22),
        metadata: {
          offer_id: obj.id,
          booking_start: obj.booking_start,
          booking_end: obj.booking_end,
          email: obj.customer_email
        },
        payment_method_types: ['card'],
        receipt_email: obj.customer_email
      });
    } catch (error) {
      throw error
    }
  },

  deletePaymentIntent: async (id) => {
    try {
      const {status} = await stripe.paymentIntents.cancel(id, {cancellation_reason: "requested_by_customer"});
      if(!status || status !== "canceled") throw new Error(`Stripe ERROR: payment intent with id ${id} status is not cancelled`)
      else return status
    } catch (error) {
      throw error
    }
  },

  deleteAbandonedPaymentIntent: async () => {
    try {

      const lastDate = new Date()
      lastDate.setDate(lastDate.getDate() -1)
      console.log(Math.floor(lastDate / 1000))
      
      const {data} = await stripe.paymentIntents.list({limit: 100 ,created: {lt: Math.floor(lastDate / 1000)}});
      
      const cancelableList = data
      .filter(intent => intent.status === "requires_payment_method")
      .map(cancelableIntent => cancelableIntent.id);

      if(!cancelableList.length) return console.log("no payment intent pending");

    

      for(const cancelableIntent of cancelableList) {
        await stripe.paymentIntents.cancel(cancelableIntent, {cancellation_reason: "abandoned"});
        
      };
      console.log("pending payment intent older than 24 deleted");
      

    } catch (error) {
      console.log(error.message);
    }
  }

}

