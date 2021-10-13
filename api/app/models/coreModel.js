const db = require('../databases/postgres.js');

class CoreModel {
    static async findAll() {
        try {
            const {rows} = await db.query(`SELECT * FROM "${this.tableName}"`);
            const instances = [];
                for(const instance of rows) {
                    instances.push(new this(instance));
                }
            return instances
        } catch (error) {
          if(error.detail) throw new Error(error.detail)
          else throw error;
        }
    }

    static async findById(id) {
      try {
        const {rows} = await db.query(`SELECT * FROM "${this.tableName}" WHERE id = $1`, [id]);
        if(!rows[0]) return;
        return new this(rows[0]);
      } catch(error) {
        if(error.detail) throw new Error(error.detail);
        throw error;
      }
    }

    static async findByUserId(id) {
      try {
        const {rows} = await db.query(`SELECT * FROM "${this.tableName}" WHERE "user_id" = $1`, [id]);
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

  
    async create(){
      try {

        const {rows} = await db.query(`SELECT new_${this.constructor.tableName}($1) AS id`, [this]);
        this.id = rows[0].id;
        return this;

      } catch (error) {

        if(error.detail) throw new Error(error.detail);
        else throw error;

      }
    }

    async update(){
      try {
          await db.query(`SELECT update_${this.constructor.tableName}($1)`, [this]);
      } catch (error) {
        if(error.detail) throw new Error(error.detail);
        else throw error;
      }
    }

    static async delete(id) {
      try {
        const {rowCount} = await db.query(`DELETE FROM "${this.tableName}" WHERE id = $1`, [id]);
        return rowCount;
      } catch(error) {
        if(error.detail) throw new Error(error.detail);
        else throw error;
      }
    }

    static async setUserUnknown(id) {
      try {
        
        await db.query(`UPDATE "${this.tableName}" SET "user_id" = 666 WHERE "user_id" = $1`, [id]);

      } catch (error) {
        if(error.detail) throw new Error(error.detail);
        throw error;
      }
    } 
}

module.exports = CoreModel;
