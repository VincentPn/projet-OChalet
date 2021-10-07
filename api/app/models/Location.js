const CoreModel = require('./coreModel');

class Location extends CoreModel {
    static tableName = "location";

    constructor(obj={}) {
        super(obj);
        for(const propName in obj) {
            this[propName] = obj[propName];
        }
    }
}

module.exports = Location;
