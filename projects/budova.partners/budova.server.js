let express = require('express');
let app = express();
var fs = require('fs');
const dbConfig = require('./db/config/database.config.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var start_mongoose = require('./db/start_mongoose')(mongoose, dbConfig);
require('./db/routes/note.routes.js')(app, express, bodyParser);
