const dotenv = require('dotenv');
const mysql = require('mysql');

//Configuring dotenv to hide passwords and important variables
dotenv.config({ path: '.env'});

//Connecting to database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});

db.connect((error) => {
    if(error){
        console.log("Failed to connect to database: " + error);
    }else{
        console.log("Connected to database...");
    }
});

module.exports = db;