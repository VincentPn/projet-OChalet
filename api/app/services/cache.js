const asyncClient = require('../utils/redis_promisify')
const {decryptAccessToken} = require('./authJwt')


const TIMEOUT = 60 * 30; // 30 minutes

const keys = [];


module.exports = async (req, res, next) => {
  
    try {
        console.log('actual cached keys', keys)
        if(req.method === "GET"){
          
          let key;
    
          const match = req.url.match(/admin|refresh|locations|offers/)
         
          if(match) key = req.url
          else {
            const {id} = await decryptAccessToken(req.headers["authorization"])
            key = req.url + id 
          }
          
    

          if (keys.includes(key)) {
              const value =  JSON.parse(await asyncClient.get(key));
              console.log('cached response')
              res.json(value);
          } 
          else if(req.url.includes('refresh')) return next()
          else {
             
              const originalJson = res.json.bind(res);

              res.json = async (data) => {
                  
                  const stringifyedData = JSON.stringify(data);

                  await asyncClient.setex(key, TIMEOUT, stringifyedData);

                  keys.push(key);

                  console.log("modified json")

                  originalJson(data);
                        
              }

              next();
          }
        }else {
            let url = req.url
            if(url.includes("?")) url = url.split('?').shift()
          
            const cachedKeys = keys.filter(key => {
              
              if(url.split('/').length === 2){
                const check = url.split('/')[1]
                if(key.includes(check)) return true
              }
              else {
                const check = url.split('/')[2]
                if(key.includes(check)) return true
              }
            })
           
            if(!cachedKeys.length) return next()

            console.log('Removing keys', cachedKeys);

            await asyncClient.del(cachedKeys);
            
            for(const key of cachedKeys) keys.splice(keys.indexOf(key), 1)
            cachedKeys.length = 0
            
            next();
        }

    } catch (error) {
        console.log(error.message)
        res.status(401).send(error.message)
    }
}



