const publicCommentRouter = require('express').Router();
const commentController = require("../controllers/commentController");

publicCommentRouter.route("/offer/comments")
.get(commentController.findByOfferId);


module.exports = publicCommentRouter;