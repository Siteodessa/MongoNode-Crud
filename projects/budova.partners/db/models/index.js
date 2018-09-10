console.log('preparing models...');

const notemodel = require('./note.model.js');
const usermodel = require('./user.model.js');
const sitedatamodel = require('./sitedata.model.js');


console.log('preparing default_users...');
const default_users = require('../config/default_users.js');
const default_sitedata = require('../config/default_sitedata.js');


module.exports = {notemodel, usermodel, sitedatamodel};
