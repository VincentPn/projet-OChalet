const bookingRouter = require('express').Router();
const bookingController = require("../controllers/bookingController");


bookingRouter.route("/bookings")
.get(bookingController.findByUserId)
.post(bookingController.create);

module.exports = bookingRouter;
