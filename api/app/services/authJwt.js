const jwt = require("jsonwebtoken")
// const {promisify} = require('util');

// const asyncVerify = promisify(jwt.verify).bind(jwt)


module.exports = {
    verifyAccessToken: (request, response, next) => {
       
        let token = request.headers["authorization"];
        if(!token) return response.status(403).send("Unauthorized")
        token = token.split(" ")[1]
        if(!token) return response.status(403).send("Unauthorized")
         
        
            
        jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, data) => {
                
        if(err) {
          console.log(err)
          response.status(403).send("Unauthorized")
        }
        else {
          
            request.token = data
            next()
        }
        })     
    },

    verifyResetPasswordToken: (request, response, next) => {
       
      let token = request.headers["authorization"];
      if(!token) return response.status(403).send("Unauthorized")
      token = token.split(" ")[1]
      if(!token) return response.status(403).send("Unauthorized")
       
      
          
      jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET, (err, data) => {
              
      if(err) {
        console.log(err)
        response.status(403).send("Unauthorized")
      }
      else {
        
          request.token = data
          next()
      }
      })     
  },

    jwtSignAccess: obj => {
        
        return jwt.sign(
            obj, 
            process.env.ACCES_TOKEN_SECRET, 
            { expiresIn: '5d', algorithm: 'HS256' }
        )

    },

    jwtSignRefresh: obj => {
      return jwt.sign(
        obj, 
        process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: '1y', algorithm: 'HS256' }
    )
    },

    jwtSignResetPassword: obj => {
      return jwt.sign(
        obj, 
        process.env.RESET_PASSWORD_TOKEN_SECRET, 
        { expiresIn: '1h', algorithm: 'HS256' }
    )
    },

    isAdmin: (request, response, next) => {
        const isAdmin = request.token.role === "admin"
        if(!isAdmin) return response.status(403).send("Unauthorized")
        next()
    },

    decryptAccessToken: (token) => {
        return new Promise((resolve, reject) => {
          if(!token) return resolve()
          token = token.split(" ")[1]
          if(!token) return resolve()
        
         
        
            
        jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, data) => {
                
        if(err) {
          console.log(err)
          return reject(err)
          
        }
        else {
       
           return resolve(data)
        }
        })
        })
      
        
    },

    decryptRefreshToken: (token) => {
    
      return new Promise((resolve, reject) => {
        if(!token) return resolve()
      token = token.split(" ")[1]
      if(!token) return resolve()
      
       
      
          
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
              
      if(err) {
       
        return reject(err)
        
      }
      else {
     
         return resolve(data)
      }
      })
      })
    
      
  },

  decryptResetPasswordToken: (token) => {
    
    return new Promise((resolve, reject) => {
      if(!token) return resolve()
      token = token.split(" ")[1]
      if(!token) return resolve()
      
      jwt.verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET, (err, data) => {
            
      if(err) return reject(err)
      
      else return resolve(data)
    
      })
    })   
  }



    
        
    
}

