const CoreModel = require('./coreModel');
const db = require('../databases/postgres.js');

class Message extends CoreModel {
    static tableName = "message";

    constructor(obj={}) {
        super(obj);
        for(const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async deleteByUserId(id) {
        try {
          
          await db.query('DELETE FROM "message" WHERE "user_id" = $1', [id])
  
        } catch (error) {
          if(error.detail) throw new Error(error.detail);
          throw error;
        }
      } 
}

module.exports = Message;
