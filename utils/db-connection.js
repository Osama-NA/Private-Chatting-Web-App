const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config({ path: '.env'});

const pool = mysql.createPool({
    connectionLimit: process.env.DATABASE_CONNECTION_LIMIT,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

module.exports = pool;