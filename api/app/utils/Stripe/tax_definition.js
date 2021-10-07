
const {stripe} = require("../../services/stripe2")

const taxDefinition = async () => {
  const taxRates = await stripe.taxRates.create({
    display_name: 'TVA',
    inclusive: true,
    percentage: 20,
    country: 'FR'
  });

  console.log(taxRates)
}

taxDefinition()
