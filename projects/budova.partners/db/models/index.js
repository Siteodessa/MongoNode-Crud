console.log('preparing models...');

const notemodel = require('./note.model.js');
const usermodel = require('./user.model.js');


console.log('preparing default_users...');
const default_users = require('../config/default_users.js');


module.exports = {notemodel, usermodel};
