  module.exports = (app, express, custom_functions) => {
    console.log('routes...');

    let database_model = dbm = require('../db/models/');
    let note_model = dbm.notemodel;
    let User = dbm.usermodel;
    let sitedata_model = dbm.sitedatamodel;
    let sitedata = dbm.default_sitedata;
    let cf  = custom_functions;

    app.use(cf.bodyParser.urlencoded({ extended: true }))
    app.use(cf.bodyParser.json())
    app.use(express.static('views'));
    app.set('view engine', 'ejs');

    cf.app = app;
    cf.express = express;
    cf.user = User;
    cf.note_model = note_model;
    cf.sitedata_model = sitedata_model;
    cf.sitedata = sitedata;


    cf.notes = require('../controllers/').notes;

    const note_router = require('./note.router.js')(cf);
    const admin_router = require('./admin.routes.js')(cf);
    const custom_router = require('./custom.routes.js')(cf);

    app.listen(127, () => console.log('app:ok'));
  }
