const adminRouter = require('express').Router()
const {cloudinaryUpload, deletePicture} = require('../services/cloudinary');
const {uploadFile} = require("../services/multer")

const bookingController = require("../controllers/bookingController")
const commentController = require("../controllers/commentController")
const messageController = require("../controllers/messageController")
const offerController = require("../controllers/offerController")
const userController = require("../controllers/userController")

adminRouter.route("/admin/user")
.get(userController.findAll)
.delete(userController.delete)

adminRouter.route("/admin/offers")
.post(uploadFile,  cloudinaryUpload, offerController.create)
.patch(offerController.update)
.delete(offerController.delete)

adminRouter.route("/admin/comments")
.get(commentController.findAll)
.delete(commentController.delete)

adminRouter.route("/admin/bookings")
.get(bookingController.findAll)
.patch(bookingController.update)
.delete(bookingController.delete)

adminRouter.route("/admin/messages")
.get(messageController.findAll)
.patch(messageController.update)
.delete(messageController.delete)


module.exports = adminRouter
