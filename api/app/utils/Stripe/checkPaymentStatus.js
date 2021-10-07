
const {stripe} = require("../../services/stripe2")

const check = (paymentIntentID) => {
  const intent = await stripe.paymentIntents.retrieve(paymentIntentID);
  console.log(intent, intent.charges.data)
}


check()
