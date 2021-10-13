const messageRouter = require('express').Router();
const messageController = require("../controllers/messageController");

messageRouter.route("/messages")
.get(messageController.findByUserId)
.post(messageController.create);

module.exports = messageRouter;
