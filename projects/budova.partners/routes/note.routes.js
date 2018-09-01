  module.exports = (app, express, bodyParser) => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.set('view engine', 'ejs');
  console.log('preparing note model...');
        var dbmodel = require('../db/models/note.model.js');
  console.log('preparing user model...');
        var User = require('../db/models/user.model.js');
  console.log('preparing controller...');
        const notes = require('../controllers/note.controller.js');
  console.log('preparing default_users...');
        const default_users = require('../db/config/default_users.js');
  console.log('preparing admin pages...');
        const admin_router = require('./admin.routes.js')(app, User, json_Result, express);
  console.log('preparing default notes...');
        app.post('/notes', notes.create);
        app.get('/notes', notes.findAll);
        app.get('/notes/:noteId', notes.findOne);
        app.put('/notes/:noteId', notes.update);
        app.put('/notes/m_update/:noteId', notes.custom_update);
        app.delete('/notes/:noteId', notes.delete);
        app.get('/fileupload', notes.upload);
        console.log('preparing frontend pages...');
        homepage('5b59c5414b38dd34d80410bd', '/', 'pages/home.ejs', app, dbmodel, express,  IsParseableJson)
        express_page('5b59c5414b38dd34d80410bd', '/stroyaschiesya-doma', 'pages/listings.ejs', app, dbmodel, express,  IsParseableJson)
        express_page('5b59c5414b38dd34d80410bd', '/sdannye-doma', 'pages/listings.ejs', app, dbmodel, express,  IsParseableJson)
        express_page('5b59c5414b38dd34d80410bd', '/tseni', 'pages/news.ejs', app, dbmodel, express,  IsParseableJson)
        express_page('5b59c5414b38dd34d80410bd', '/onas', 'pages/about.ejs', app, dbmodel, express,  IsParseableJson)
        express_page('5b59c5414b38dd34d80410bd', '/contacts', 'pages/contacts.ejs', app, dbmodel, express,  IsParseableJson)
        express_page('5b59c5414b38dd34d80410bd', '/altair', 'pages/single.ejs', app, dbmodel, express,  IsParseableJson)
        express_page('5b59c5414b38dd34d80410bd', '/elements', 'pages/elements.ejs', app, dbmodel, express,  IsParseableJson)
  app.listen(80, () => console.log('app:ok'));
  }
