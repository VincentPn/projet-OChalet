const cron = require("node-cron");
const {deleteAbandonedPaymentIntent} = require('./stripe');

cron.schedule("0 0 3 * * *", deleteAbandonedPaymentIntent);