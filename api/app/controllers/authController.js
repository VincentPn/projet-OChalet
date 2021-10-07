const {User} = require('../models');
const bcrypt = require('bcrypt');
const {jwtSignAccess, jwtSignRefresh, jwtSignResetPassword, decryptRefreshToken, decryptResetPasswordToken} = require('../services/authJwt')
const asyncClient = require('../utils/redis_promisify')
const sendEmail = require('../services/nodemail')
const resetPasswordTemplate = require('../utils/email-templates/resetPasswordTemplate')

const TIMEOUT = 60 * 30; // 30 minutes

const authController = {
    signin: async (request, response) => {
        try {
          const {email, password} = request.body
          
          const user = await User.findByEmail(email)
          if(!user) return response.status(404).end("auth error")
    
          const compare = await bcrypt.compare(password, user.password)
          if(!compare) return response.status(404).end("auth error")
    
          const accessToken = jwtSignAccess({id: user.id, role: user.role})
          const refreshToken = jwtSignRefresh({id: user.id, role: user.role})
          if(!accessToken || !refreshToken) throw new Error("internal error sever")

          await asyncClient.setex("refreshTokenUser" + user.id, TIMEOUT, refreshToken)

          delete user.password;

          response.json({accessToken, refreshToken, user})
          
        } catch (error) {
            response.status(500).end(error.message)
        }
    
      },

      signup: async (request, response) => {
        try {
            const {email, password} = request.body

            const registeredUser = await User.findByEmail(email)
            if(registeredUser) return response.status(400).end("already registered")

            delete request.body.passwordConfirm
            
            
            const salt = await bcrypt.genSalt(10);
            request.body.password = await bcrypt.hash(password, salt);

            

            const newUser = await new User(request.body).create();
            
            delete newUser.password

            response.status(201).send("registration successfull")

          
        } catch (error) {
            response.status(500).end(error.message)
        }
      },

      refreshToken: async (request, response) => {
        
        try {
          const data = await decryptRefreshToken(request.headers['authorization'])

          const cachedRefreshToken = await asyncClient.get("refreshTokenUser" + data.id)

    
          if(request.headers["authorization"].split(" ").pop() !== cachedRefreshToken) return response.status(401).send("Unauthorized")

          const accessToken = jwtSignAccess({id: data.id, role: data.role})
          const refreshToken = jwtSignRefresh({id: data.id, role: data.role})

          await asyncClient.setex("refreshTokenUser" + data.id, TIMEOUT, refreshToken)

          response.json({accessToken, refreshToken})

        } catch (error) {
            console.log(error)
            response.status(500).send(error.message)
        }

      },

      resetPassword: async (request, response) => {
        const {email} = request.body
        const user = await User.findByEmail(email)
        if(!user) return response.status(404).send("not found")

        const resetPasswordToken = jwtSignResetPassword({id: user.id})
        
        const emailBody = resetPasswordTemplate(resetPasswordToken)

        await sendEmail("ochaleto@gmail.com", "Reset Password", emailBody)

        response.send("email sent")

      },

      confirmResetPassword: async (request, response) => {
          try {

            
            delete request.body.passwordConfirm
           
            const user = await User.findById(request.token.id)
           
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(request.body.password, salt);

            await user.update()


            response.send("Password updated")

          } catch (error) {
              console.log(error)
              response.status(500).send(error.message)
          }

          

      }

}

module.exports = authController;
