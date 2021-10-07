const commentRouter = require('express').Router()
const commentController = require("../controllers/commentController")


commentRouter.route("/comments")
.get(commentController.findByUserId)
.post(commentController.create)
.delete(commentController.delete)





module.exports = commentRouter
