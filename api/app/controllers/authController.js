const {User} = require('../models');
const bcrypt = require('bcrypt');
const {jwtSignAccess, jwtSignRefresh, jwtSignResetPassword, decryptRefreshToken, decryptResetPasswordToken} = require('../services/jsonWebToken');
const asyncClient = require('../utils/redisPromisify');
const sendEmail = require('../services/nodemailer');
const resetPasswordTemplate = require('../utils/email-templates/resetPasswordTemplate');


const authController = {
    signin: async (request, response) => {
        try {
          const {email, password} = request.body;
          
          const user = await User.findByEmail(email);
          if(!user) return response.status(404).end("auth error");
    
          const compare = await bcrypt.compare(password, user.password);
          if(!compare) return response.status(404).end("auth error");
    
          const accessToken = jwtSignAccess({id: user.id, role: user.role});
          const refreshToken = jwtSignRefresh({id: user.id, role: user.role});
          if(!accessToken || !refreshToken) throw new Error("JWT sign ERROR");

          await asyncClient.setex("refreshTokenUser" + user.id, 60*30, refreshToken);

          delete user.password;
          
          for(const field in user){
            if(!user[field]) delete user[field]
          };

          response.json({accessToken, refreshToken, user});
          
        } catch (error) {
            response.status(500).end(error.message);
        }
    
      },

      signup: async (request, response) => {
        try {
            const {email, password} = request.body;

            const registeredUser = await User.findByEmail(email);
            if(registeredUser) return response.status(401).end("already registered");
            
            const salt = await bcrypt.genSalt(10);
            request.body.password = await bcrypt.hash(password, salt);

            delete request.body.passwordConfirm;

            const {id} = await new User(request.body).create();
            if(!id) throw new Error("user registration error");

            response.status(201).send("registration successfull");

          
        } catch (error) {
            response.status(500).end(error.message)
        }
      },

      refreshToken: async (request, response) => {
        
        try {
          const actualRefreshToken = request.headers['authorization'];
          const actualTokenPayload = await decryptRefreshToken(actualRefreshToken);
          
          const cachedRefreshToken = await asyncClient.get("refreshTokenUser" + actualTokenPayload.id);
          if(!cachedRefreshToken) return response.status(401).send("Unauthorized");

          if(actualRefreshToken.split(" ").pop() !== cachedRefreshToken){
            return response.status(401).send("Unauthorized");
          };

          const accessToken = jwtSignAccess({id: actualTokenPayload.id, role: actualTokenPayload.role});
          const refreshToken = jwtSignRefresh({id: actualTokenPayload.id, role: actualTokenPayload.role});

          await asyncClient.setex("refreshTokenUser" + actualTokenPayload.id, 60*30, refreshToken);

          response.json({accessToken, refreshToken});

        } catch (error) {
            response.status(500).send(error.message);
        }

      },

      resetPassword: async (request, response) => {
        const {email} = request.body;
        const user = await User.findByEmail(email);
        if(!user) return response.status(404).send("user not found");

        const resetPasswordToken = jwtSignResetPassword({id: user.id});
        
        const emailBody = resetPasswordTemplate(resetPasswordToken);

        await asyncClient.setex("resetPasswordToken" + user.id, 60*60, "")

        await sendEmail("ochaleto@gmail.com", "Reset Password", emailBody);

        response.json("email sent");

      },

      confirmResetPassword: async (request, response) => {
          try {
            
            const tokenPayload = await decryptResetPasswordToken(`Bearer ${request.body.resetPasswordToken}`);

            const cachedResetPasswordToken = await asyncClient.exists("resetPasswordToken" + tokenPayload.id);
            if(!cachedResetPasswordToken) return response.status(401).send("invalid reset password token");

            const user = await User.findById(tokenPayload.id);
           
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(request.body.password, salt);

            delete request.body.passwordConfirm;
            delete request.body.resetPasswordToken;

            await user.update();

            await asyncClient.del("resetPasswordToken" + tokenPayload.id);

            response.json({message: "Password updated"});

          } catch (error) {
              response.status(500).send(error.message)
          }

      }

}

module.exports = authController;
