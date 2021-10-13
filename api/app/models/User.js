const CoreModel = require('./coreModel');
const db = require('../databases/postgres.js');

class User extends CoreModel {
    static tableName = "user";

    constructor(obj={}) {
        super(obj);
        for(const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async findByEmail(email) {
        try {
          
          const {rows} = await db.query('SELECT * FROM "user" WHERE "email" = $1', [email]);
          return rows[0];
          

        } catch(error) {
          if(error.detail) throw new Error(error.detail);
          throw error;
        }
    }
}

module.exports = User;
