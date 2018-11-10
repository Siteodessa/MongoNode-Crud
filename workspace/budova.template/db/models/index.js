console.log('models...');

const Note_m = require('./note.model');
const User_m = require('./user.model');
const Sitedata_m = require('./sitedata.model');
const Task_m = require('./task.model');


console.log('default_users...');
const default_users = require('../config/default_users');
const default_sitedata = require('../config/default_sitedata');
const default_reviews = require('../config/default_reviews');


module.exports = {
  Note_m,
  User_m,
  Sitedata_m,
  default_users,
  default_sitedata,
  Task_m
};
