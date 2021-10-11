const {Pool} = require('pg');
require('dotenv').config()

const config = {
    connectionString: process.env.DATABASE_URL
};

let pool;
if(process.env.NODE_ENV !== "docker"){
    config.ssl = {
        rejectUnauthorized: false
    }
    setTimeout(() => {
        pool = new Pool(config);
    }, 1000);
}

pool = new Pool(config);

pool.query('SELECT NOW()')
.then(data => console.log("postgres database connected"))
.catch(err => console.log(err))

module.exports = pool;
