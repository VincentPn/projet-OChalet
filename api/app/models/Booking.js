const CoreModel = require('./coreModel');
const db = require('../databases/postgres.js');

class Booking extends CoreModel {
    static tableName = "booking";

    constructor(obj={}) {
        super(obj);
        for(const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async findByOffer(offer_id) {
      try {

        const {rows} = await db.query('SELECT "reservation_start", "reservation_end" FROM "booking" WHERE "offer_id" = $1', [offer_id]);
        return rows

      } catch(error) {
        if(error.detail) throw new Error(error.detail);
        throw error;
      }
    }
}

module.exports = Booking;
