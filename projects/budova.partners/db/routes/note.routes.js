

var my_tests = require('../../db/my_tests');

module.exports = (app, express, bodyParser, my_tests) => {
var dbmodel = require('../../db/models/note.model.js');
const notes = require('../controllers/note.controller.js');
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.post('/notes', notes.create);
  app.get('/notes', notes.findAll);
  app.get('/notes/:noteId', notes.findOne);
  app.put('/notes/:noteId', notes.update);
  app.put('/notes/m_update/:noteId', notes.custom_update);
  app.delete('/notes/:noteId', notes.delete);
  app.set('view engine', 'ejs');


express_page('5b59c5414b38dd34d80410bd', '/', 'pages/home.ejs', app, dbmodel, express,  IsParseableJson)
express_page('5b59c5414b38dd34d80410bd', '/stroyaschiesya-doma', 'pages/listings.ejs', app, dbmodel, express,  IsParseableJson)
express_page('5b59c5414b38dd34d80410bd', '/sdannye-doma', 'pages/listings.ejs', app, dbmodel, express,  IsParseableJson)
express_page('5b59c5414b38dd34d80410bd', '/tseni', 'pages/news.ejs', app, dbmodel, express,  IsParseableJson)
express_page('5b59c5414b38dd34d80410bd', '/onas', 'pages/about.ejs', app, dbmodel, express,  IsParseableJson)
express_page('5b59c5414b38dd34d80410bd', '/contacts', 'pages/contacts.ejs', app, dbmodel, express,  IsParseableJson)
//Warning !  pages, including db loops must be reworked and must be able to create a new page
express_page('5b59c5414b38dd34d80410bd', '/altair', 'pages/single.ejs', app, dbmodel, express,  IsParseableJson)
express_page('5b59c5414b38dd34d80410bd', '/elements', 'pages/elements.ejs', app, dbmodel, express,  IsParseableJson)
}
