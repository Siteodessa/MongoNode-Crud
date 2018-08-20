

var my_tests = require('../../db/my_tests');

module.exports = (app, express, bodyParser, my_tests) => {
// var dbmodel = require('../../db/models/note.model.js');
// const notes = require('../controllers/note.controller.js');
app.get('/', require('./frontpage').get);

app.get('/login', require('./login').get);
app.post('/login', require('./login').post);

app.post('/logout', require('./logout').post);

app.get('/admin', checkAuth, require('./admin').get);

}
