  function type_n_log(a) {
  let b = typeof(a);
  console.log(b);
  console.log("~~~~~~~~");
  console.log(a);
  console.log("~~~~~~~~");
  for (let prop in a) {
  console.log(prop);
  }
  }
  function IsParseableJson(str) {
  try {
  JSON.parse(str);
  } catch (e) {
  return false;
  }
  return true;
  }
  function json_Result(string){
  let obj = { result: string};
  let myJSON = JSON.stringify(obj);
  return myJSON;
  }
  function express_page(db_id, pageurl, ejs_file, app, dbmodel, express,  IsParseableJson){
  app.get(pageurl, function(req, res) {
  d = {};
  dbmodel.find({}, function(err, data) {
  app.use(express.static('views'));
  data.forEach(elem => {
  if (elem.id == db_id)
  for (let prop in elem) {
  if (IsParseableJson(elem[prop])) {   d[prop] = JSON.parse(elem[prop]) }
  else { d[prop] = elem[prop] }
  }
  }
  );

  res.status(200).render(ejs_file, {
  d: d
  });
  });
  });
  }
  function homepage(db_id, pageurl, ejs_file, app, dbmodel, express,  IsParseableJson){
  app.get(pageurl, function(req, res) {
  d = {};
  dbmodel.find({}, function(err, data) {
  app.use(express.static('views'));
  data.forEach(elem => {
  if (elem.id == db_id)
  for (let prop in elem) {
  if (IsParseableJson(elem[prop])) {   d[prop] = JSON.parse(elem[prop]) }
  else { d[prop] = elem[prop] }
  }
  }
  );

  res.status(200).render(ejs_file, {
  d: d,
  content: data
  });
  });
  });
  }



  module.exports = (app, express, bodyParser) => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.set('view engine', 'ejs');
const db_model = require('../db/models/');
var dbmodel = db_model.dbmodel;
var User = db_model.User;


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

                app.get('/doma/:noteId', notes.findOnePage);


        app.get('/fileupload', notes.upload);

        console.log('preparing frontend pages...');

        homepage('5b59c5414b38dd34d80410bd', '/', 'pages/home.ejs', app, dbmodel, express,  IsParseableJson)
        //
        //   app.get('/', function(req, res){
        // dbmodel.find()
        // .then(notes => {
        //   d = {}
        //     notes.forEach(elem => {
        //       if (elem.id == '5b59c5414b38dd34d80410bd')
        //       for (let prop in elem) {
        //       if (IsParseableJson(elem[prop])) {   d[prop] = JSON.parse(elem[prop]) }
        //       else { d[prop] = elem[prop] }
        //       }
        //      })
        //   return res.status(200).render('pages/home.ejs', {
        //   user: req.session.user,
        //           content: notes,
        //           d: d
        // });
        // }).catch(err => {
        //     res.status(500).send({
        //         message: err.message || "Some error occurred while retrieving notes."
        //     });
        //   })
        // });


        express_page('5b59c5414b38dd34d80410bd', '/stroyaschiesya-doma', 'pages/listings.ejs', app, dbmodel, express,  IsParseableJson)
        express_page('5b59c5414b38dd34d80410bd', '/sdannye-doma', 'pages/listings.ejs', app, dbmodel, express,  IsParseableJson)
        express_page('5b59c5414b38dd34d80410bd', '/tseni', 'pages/news.ejs', app, dbmodel, express,  IsParseableJson)
        express_page('5b59c5414b38dd34d80410bd', '/onas', 'pages/about.ejs', app, dbmodel, express,  IsParseableJson)
        express_page('5b59c5414b38dd34d80410bd', '/contacts', 'pages/contacts.ejs', app, dbmodel, express,  IsParseableJson)
        //Warning !  pages, including db loops must be reworked and must be able to create a new page
        express_page('5b59c5414b38dd34d80410bd', '/altair', 'pages/single.ejs', app, dbmodel, express,  IsParseableJson)
        express_page('5b59c5414b38dd34d80410bd', '/elements', 'pages/elements.ejs', app, dbmodel, express,  IsParseableJson)



  app.listen(80, () => console.log('app:ok'));
  }
