const asyncClient = require('../utils/redisPromisify')
const {decryptAccessToken} = require('./jsonWebToken')


const TIMEOUT = 60 * 10; // 10 minutes

const keys = [];


module.exports = async (request, response, next) => {
  
    try {
        
        if(request.method === "GET"){
          
          let key;
          const match = request.url.match(/admin|refresh|locations|offers|offer/);
         
          if(match) key = request.url
          else if(request.headers["authorization"]) {
            const {id} = await decryptAccessToken(request.headers["authorization"]);
            key = request.url + id;
          }
          else return next();
          
          if (keys.includes(key) && await asyncClient.exists(key)) {
              console.log(`Visitor count: ${await asyncClient.incr('visitor')}`)
              const value =  JSON.parse(await asyncClient.get(key));
              
              response.json(value);
          } 
          else if(request.url.includes('refresh')) return next()
          else {
              console.log(`Visitor count: ${await asyncClient.incr('visitor')}`)
              const originalJson = response.json.bind(response);

              response.json = async (data) => {
                  
                  const stringifyedData = JSON.stringify(data);

                  await asyncClient.setex(key, TIMEOUT, stringifyedData);

                  keys.push(key);

                  originalJson(data);        
              }

              next();
          }
        }else {
            let url = request.url;
            if(url.includes("?")) url = url.split('?').shift();
          
            const cachedKeys = keys.filter(key => {
              
              if(url.split('/').length === 2){
                const check = url.split('/')[1];
                if(key.includes(check)) return true;
                if(check.includes("signup") && key.includes("admin/user") ) return true;
                if(check.includes("booking") && key.includes("offer")) return true;
              }
              else {
                const check = url.split('/')[2];
                if(key.includes(check)) return true;
                if(check.includes("signup") && key.includes("admin/user") ) return true;
                if(check.includes("booking") && key.includes("offer")) return true;
              }
            });
           
            if(!cachedKeys.length) return next();

            await asyncClient.del(cachedKeys);
            
            for(const key of cachedKeys) keys.splice(keys.indexOf(key), 1);
            cachedKeys.length = 0;
            
            next();
        }

    } catch (error) {
        response.status(401).send(error.message);
    }
}



