const dotenv = require('dotenv');
const mysql = require('mysql');

//Configuring dotenv to hide passwords and important variables
dotenv.config({ path: '.env'});

//Connecting to database
const pool = mysql.createPool({
    connectionLimit: process.env.DATABASE_CONNECTION_LIMIT,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});


module.exports = pool;