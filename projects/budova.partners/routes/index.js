  module.exports = (app, express, custom_functions) => {
    console.log('preparing routes...');

    let database_model = dbm = require('../db/models/');
    let dbmodel = dbm.notemodel;
    let User = dbm.usermodel;
    let sitedata = dbm.sitedatamodel;
    let cf  = custom_functions;

    app.use(cf.bodyParser.urlencoded({ extended: true }))
    app.use(cf.bodyParser.json())
    app.use(express.static('views'));
    app.set('view engine', 'ejs');


    cf.app = app;
    cf.express = express;
    cf.user = User;
    cf.dbmodel = dbmodel;
    cf.sitedata = sitedata;
    cf.notes = require('../controllers/').notes;


    const note_router = require('./note.router.js')(cf);
    const admin_router = require('./admin.routes.js')(cf);
    const custom_router = require('./custom.routes.js')(cf);

  app.listen(80, () => console.log('app:ok'));
  }
