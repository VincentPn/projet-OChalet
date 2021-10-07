
const stripeKey = process.env.STRIPE_TEST_PRIVATE_KEY
const {Offer} = require('../models')

const stripe = require("stripe")(stripeKey)



module.exports = {
  stripe,
  bill: async (basket) => {
    
    try {
      const bill = []

      for(const offerID of basket) {
        
          const offer = await Offer.findById(offerID)

          bill.push({
            price_data: {
              currency: "eur",
              product_data: {
                name: `${offer.title} - ${Date.now()}`
              },
              unit_amount: offer.price_ht * 100 * 1.3
            },
            tax_rates: ["txr_1JfQloKVmN7kqniymoRgpnqp"],
            quantity: 1  
          })
        

      };
      
      if(basket.length !== bill.length) throw new Error("Payment error")
      return bill

    } catch (error) {
        console.log(error)
        throw error

    }
  },


}

