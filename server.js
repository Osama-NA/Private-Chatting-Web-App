const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));

//Parse JSON bodies (as sent by API clients)
app.use(express.json());

//Setting view engine to hbs to handle hbs files
app.set('view engine', 'hbs');

//Setting routes
app.use('/', require('./routes/pages'));
app.use('/db', require('./routes/db'));

//Setting server to listen on port 'PORT'
app.listen(PORT, (error) => {
    if(error) {
        console.log("Failed to listen on port " + PORT + ": " + error);
    }else{
        console.log("Listening on port " + PORT);
    }
});