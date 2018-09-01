  console.log('preparing routes...');
  module.exports = (app, express, custom_functions) => {
    let type_n_log = custom_functions.type_n_log;
    let IsParseableJson = custom_functions.IsParseableJson;
    let json_Result = custom_functions.json_Result;
    let express_page = custom_functions.express_page;
    let homepage = custom_functions.homepage;
    let bodyParser = custom_functions.bodyParser;



  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(express.static('views'));
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



         app.get('/doma/:page_link',  function(req, res) {


           dbmodel.find()
          .then(notes => {
            elemo = null;
            notes.forEach(elem => {
            if (elem.page_link == req.params.page_link) {
              elem.sitename = 'Budovka';
      res.render('pages/listings_single.ejs', {d: elem})
            }
             });
             return elemo
          }).catch(err => {
              res.send({
                  message: err.message || "Some error occurred while retrieving notes."
              });
          });
         });
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
