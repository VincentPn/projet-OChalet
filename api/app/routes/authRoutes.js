const authRouter = require('express').Router()
const authController = require("../controllers/authController")
const {verifyResetPasswordToken} = require('../services/authJwt')

authRouter.post("/signin", authController.signin)
authRouter.post("/signup", authController.signup)
authRouter.get("/refresh_token", authController.refreshToken)
authRouter.post("/reset_password", authController.resetPassword)
authRouter.post("/confirm_reset", verifyResetPasswordToken, authController.confirmResetPassword)

module.exports = authRouter
