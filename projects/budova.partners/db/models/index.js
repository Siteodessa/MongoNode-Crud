console.log('preparing note model...');
var dbmodel = require('../models/note.model.js');


console.log('preparing user model...');
var User = require('../models/user.model.js');


module.exports = {dbmodel, User};
