const protectedCommentRouter = require('express').Router();
const commentController = require("../controllers/commentController");


protectedCommentRouter.route("/comments")
.get(commentController.findByUserId)
.post(commentController.create)
.delete(commentController.delete);


module.exports = protectedCommentRouter;
