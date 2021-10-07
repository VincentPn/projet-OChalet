const userRouter = require('express').Router()
const userController = require("../controllers/userController")


userRouter.route("/user")
.get(userController.findById)
.patch(userController.update)
.delete(userController.delete)




module.exports = userRouter
