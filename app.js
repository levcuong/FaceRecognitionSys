const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

// Configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.urlreal)
.then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log("Could not connect to the database");
    process.exit();
});

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(fileUpload());

// route
require('./routes/image.route')(app);
require('./routes/user.route')(app);

// listen on port
app.listen('3000', err => {
    console.error("Server listening on localhost:3000");
});
