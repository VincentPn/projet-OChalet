const CoreModel = require('./coreModel');
const db = require('../databases/postgres.js');

class Comment extends CoreModel {
    static tableName = "comment";

    constructor(obj={}) {
        super(obj);
        for(const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async findByOfferId(id) {
        try {
          const {rows} = await db.query(`SELECT * FROM "${this.tableName}" WHERE "offer_id" = $1`, [id]);
          const instances = [];
          for(const instance of rows) {
              instances.push(new this(instance));
          }
          return instances;
          
        } catch(error) {
          if(error.detail) throw new Error(error.detail);
          throw error;
        }
    }

}



module.exports = Comment;
