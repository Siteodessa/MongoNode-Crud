  module.exports = (app, express, custom_functions) => {
    console.log('routes...');

    let database_model = dbm = require('../db/models/');
    let note_model = dbm.Note_m;
    let User = dbm.User_m;
    let sitedata_model = dbm.Sitedata_m;
    let sitedata = dbm.default_sitedata;
    let Task_m = dbm.Task_m;
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
    cf.Task_m = Task_m;

    cf.notes = require('../controllers/').notes;
    cf.Task_c = require('../controllers/').Task_c;




    const note_router = require('./note.router.js')(cf);
    const admin_router = require('./admin.routes.js')(cf);
    const custom_router = require('./custom.routes.js')(cf);
    const admin_api_router = require('./admin.api.routes.js')(cf);
    app = cf.app
    app.listen(1000, () => console.log('app:ok'));
  }
