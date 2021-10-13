const adminRouter = require('express').Router();
const {cloudinaryUpload, deletePicture} = require('../services/cloudinary');
const uploadFile = require("../services/formidable");
const newsLetterSender = require('../services/newsletter');
const dataValidator = require('../services/dataValidator');

const bookingController = require("../controllers/bookingController");
const commentController = require("../controllers/commentController");
const messageController = require("../controllers/messageController");
const offerController = require("../controllers/offerController");
const userController = require("../controllers/userController");

adminRouter.route("/admin/user")
.get(userController.findAll)
.delete(userController.delete);

adminRouter.route("/admin/offers")
.post(uploadFile, dataValidator, cloudinaryUpload, offerController.create)
.patch(offerController.update)
.delete(offerController.delete);

adminRouter.route("/admin/comments")
.delete(commentController.delete);

adminRouter.route("/admin/bookings")
.get(bookingController.findAll)
.patch(bookingController.update)
.delete(bookingController.delete);

adminRouter.route("/admin/messages")
.get(messageController.findAll)
.patch(messageController.update)
.delete(messageController.delete);

adminRouter.route("/admin/newsletter")
.post(newsLetterSender);


module.exports = adminRouter;
