const jwt = require("jsonwebtoken")
const {promisify} = require('util');
const asyncVerify = promisify(jwt.verify).bind(jwt)


module.exports = {
    verifyAccessToken: async (request, response, next) => {
       
        try {
          let token = request.headers["authorization"];
          if(!token) return response.status(403).send("Unauthorized");
          token = token.split(" ")[1];
          if(!token) return response.status(403).send("Unauthorized");
          
          request.token = await asyncVerify(token, process.env.ACCESS_TOKEN_SECRET);
          next();

        } catch (error) {
          console.log(error.message);
          response.status(500).send({error: "Authentication error"});
        }
            
    },

    jwtSignAccess: obj => {
        try {
          return jwt.sign(
            obj, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '5d', algorithm: 'HS256' }
          );
        } catch (error) {
          console.log(error);
          throw error;
        }
    },

    jwtSignRefresh: obj => {
        try {
          return jwt.sign(
            obj, 
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: '1y', algorithm: 'HS256' }
          );
        } catch (error) {
          console.log(error.message);
          throw error;
        }
    },

    jwtSignResetPassword: obj => {
        try {
          return jwt.sign(
            obj, 
            process.env.RESET_PASSWORD_TOKEN_SECRET, 
            { expiresIn: '1h', algorithm: 'HS256' }
          );
        } catch (error) {
          console.log(error.message);
          throw error;
        }
    },

    isAdmin: (request, response, next) => {
        const isAdmin = request.token.role === "admin";
        if(!isAdmin) return response.status(403).send("Unauthorized");
        next();
    },

    decryptAccessToken: async (token) => {

        try {
          return await asyncVerify(token.split(' ').pop(), process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
          console.log(error.message);
          throw error;
        }
    },

    decryptRefreshToken: async (token) => {

        try {
          return await asyncVerify(token.split(' ').pop(), process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
          console.log(error.message);
          throw error;
        }
    },

    decryptResetPasswordToken: async (token) => {

        try {
          return await asyncVerify(token.split(' ').pop(), process.env.RESET_PASSWORD_TOKEN_SECRET);
        } catch (error) {
          console.log(error.message);
          throw error;
        }  

    }
};

