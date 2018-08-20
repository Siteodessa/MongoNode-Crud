let express = require('express');
let app = express();
var fs = require('fs');
var HttpError = require('./error').HttpError;


const dbConfig = require('./db/config/database.config.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var start_mongoose = require('./db/start_mongoose')(mongoose, dbConfig);
require('./db/routes/note.routes.js')(app, express, bodyParser);
<<<<<<< HEAD

require('./routes')(app);





app.listen(80, () => console.log(' application is running port 80!'));
=======
>>>>>>> parent of 0ec9383... v.0.0.6b
