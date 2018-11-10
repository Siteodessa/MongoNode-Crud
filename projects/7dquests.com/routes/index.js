module.exports = (core) => {
    let cf = core;

    var dbmodel = require('../db/models/note.model');
    var User = require('../db/models/user.model');
    const notes = require('../controllers/note.controller');
    const reviews = require('../controllers/reviews.controller');
    const quests = require('../controllers/quest.controller');
    const subscribe_c = require('../controllers/subscribe.controller');
    const api_c = require('../controllers/api.controller');
    const brone_c = require('../controllers/brone_controller');
    const default_users = require('../db/config/default_users');
    const admin_router = require('./admin.routes.js')(User, core);
    const image_routes = require('./image_routes')(core);
    var quests_m = require('../db/models/quest.model');
    var api = require('./api')(core, api_c, notes, subscribe_c, brone_c, reviews, quests, quests_m);
    const pages = require('./pages.routes')(core, dbmodel, quests_m, quests);


core.app.listen(28, () => console.log('app:ok'));
}
