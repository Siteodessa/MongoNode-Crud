console.log('Starting...');
var fs = require('fs');


let express = require('../../node_modules/express');
let app = express();
const dbConfig = require('./db/config/database.config.js');
console.log('starting mongoose...');
const mongoose = require('../../node_modules/mongoose');
var start_mongoose = require('./db/start_mongoose')(mongoose, dbConfig);
var custom_functions = require('./controllers/custom_functions');
require('./routes/')(app, express, custom_functions );
