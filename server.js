const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');
var expressListings = require('expresslistings');
var get_all_folder_names = require('get_all_folder_names');
// console.clear()
 
function logObject(object) {
  Object.keys(object).map(function(objectKey, index) {
        var value = object[objectKey];
        console.log(objectKey + ' =>' + value);
    });
}
function callbackObject(object, cb) {
  Object.keys(object).map(function(objectKey, index) {
        var value = object[objectKey];
        cb(value);
    });
}
function appget(urlpath, ex_static, filename  ) {
 app.get(urlpath, function(req, res) {
   app.use(express.static(ex_static));
     res.sendFile(ex_static + filename, {root: __dirname });
 });
}
const app = express();// create express app
app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse requests of content-type - application/json
const dbConfig = require('./config/database.config.js');// Configuring the database
const mongoose = require('mongoose');// Эта хуйня сначала не хотела коннектиться к базе, и в статье с инструкцией ничего дополнительного не было написано, поэтому я открыл C://Mongo  и нашел там mongod и запустил его, как то так и завелось
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {  // console.log("Successfully connected to the database");
}).catch(err => {  // console.log('Could not connect to the database. Suggest Exiting now , you can make it via process.exit() in ur node code...');
//    process.exit();
});
// MULTISERVER
var views = get_all_folder_names('views/');
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
for (let k in views) {
      if (views.hasOwnProperty(k)) {
      var splits = views[k].split('/', 2)
      var splits2 = splits[1]
      views[k] = splits2
      }
}
var a = views;
var unique = a.filter( onlyUnique );
views = unique
for (let k in views) {
  if (views.hasOwnProperty(k)) {
    new appget( '/'+ views[k], 'views/'+ views[k] +'/'+ views[k] +'/', '/index.html' );
  }
}
// MULTISERVER

new appget( '/', 'projects/budova.partners/', '/index.html' );
// define a simple route
// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
// });
app.get('/test', (req, res) => {

const dev_menu_generator = require('dev_menu_generator');
    res.send(menu_navigator);
});
require('./app/routes/note.routes.js')(app);
// listen for requests
var port = process.env.PORT || 80;
app.listen(port, () => {
    console.log("Server is listening on port " + port + "");
});
