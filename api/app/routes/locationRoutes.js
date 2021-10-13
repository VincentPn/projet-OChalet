const locationRouter = require('express').Router();
const locationController = require("../controllers/locationController");


locationRouter.route("/locations")
.get(locationController.findAll);


module.exports = locationRouter;
