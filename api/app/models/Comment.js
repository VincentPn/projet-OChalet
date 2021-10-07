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

}



module.exports = Comment;
