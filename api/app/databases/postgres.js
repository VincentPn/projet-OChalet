const {Pool} = require('pg');
require('dotenv').config()

const config = {
    connectionString: process.env.DATABASE_URL
};

if(process.env.NODE_ENV !== "docker"){
    config.ssl = {
        rejectUnauthorized: false
    }
}

const pool = new Pool(config);

pool.query('SELECT NOW()')
.then(data => console.log("postgres database connected"))
.catch(err => console.log(err))

module.exports = pool;
