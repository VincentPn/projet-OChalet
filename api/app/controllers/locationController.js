const {Location} = require('../models');
const {incr, exists, set, get} = require("../utils/redisPromisify")

const locationController = {

    findAll: async (_, response) => {
        try {
            const locations = await Location.findAll();
            if(await exists("visitor")){
                await incr('visitor')
                const nbVisitor = await get('visitor')
                console.log(`Visitor count: ${nbVisitor}`)
            }else{
                await set("visitor", 1)
                console.log('Visitor count: 1')
            }
            response.json(locations);
        } catch(error) {
            response.status(500).send(error.message);
        }
    }
}

module.exports = locationController;
