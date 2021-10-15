const {Location} = require('../models');
const {incr, exists, set, get} = require("../utils/redisPromisify")

const locationController = {

    findAll: async (_, response) => {
        try {
            const locations = await Location.findAll();
            response.json(locations);
        } catch(error) {
            response.status(500).send(error.message);
        }
    }
}

module.exports = locationController;
