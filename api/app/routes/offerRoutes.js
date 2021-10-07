const offerRouter = require('express').Router();
const offerController = require("../controllers/offerController");



offerRouter.route("/offers")
.get(offerController.findAllorFilter)



module.exports = offerRouter
