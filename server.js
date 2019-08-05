const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    //res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
    //res.end("hi");
    res.sendFile(__dirname+ '/public/index.html');
});

app.get('/about/', (req, res) => {
    //res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
    //res.end("hi");
    res.sendFile(__dirname + '/public/about.html');
});

app.get('/form/', (req, res) => {
    res.sendFile(__dirname + '/public/form.html');
});

app.get('/db/', (req, res) => {
    res.send();
    res.end();
});

// make public static files avaiable
app.use(express.static('public'));

// require tests routes
require('./app/routes/test.routes.js')(app);

const PORT = process.env.PORT || 5000;

// listen for requests
app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});