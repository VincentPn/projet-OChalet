const schema = require("../schemas")

module.exports = async (req, res, next) => {

    try {

        const dataLocationsList = ["body", "query"];

        const dataLocation = dataLocationsList.find(location => Object.keys(req[location]).length);
        if(!dataLocation) return next();
        
        const urlSchemaMatch = req.url
            .split("/")
            .map(element => element.includes("?") ? element.split("?").shift() : element)
            .filter(element => element.match(/signin|signup|reset|refresh/g) ? element : schema[element]);

        if(!urlSchemaMatch.length) return res.status(400).send("no schema match");

        console.log("validator activated");
        
        req[dataLocation] = await validate(req[dataLocation], urlSchemaMatch, req.method);
        
        next();
        
    } catch (error) {
        res.status(400).json(error.message);
    }
    
}

const validate = (data, urlSchemaMatch, method) => {

    return new Promise((resolve, reject) => {
        if(schema[urlSchemaMatch[0]]){
          
            
            const schemaName = Object.keys(schema[urlSchemaMatch[0]]).find(name => {
                if(method === "PATCH" && name.match(/update|patch/gi)) return true;
                   
                if(method === "POST" && name.match(/create|add|save|post/gi)) return true;

                if(method === 'GET' && name.match(/get|filter/gi)) return true;

                if(method === 'DELETE' && name.match(/remove|delete/gi)) return true;

            });

            if(!schemaName) return reject({message:"no schema match"});
            
           
            const {error, value} = schema[urlSchemaMatch[0]][schemaName].validate(data);
            
            if(error) return reject(error.details[0]);
            else return resolve(value);

  
        }
        else if(schema.auth[urlSchemaMatch]){
            
            const {error, value} = schema.auth[urlSchemaMatch].validate(data);
            if(error) return reject(error.details[0]);
            else return resolve(value);
            
        }
        else return reject({message: "no schema match"});
    });
   
};
