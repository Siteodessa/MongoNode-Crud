console.log('controller...');

const notes = require('./note.controller');
const User = require('./user.controller');
const Task_c = require('./task.controller');
const Sitedata_c = require('./sitedata.controller');
console.log('Sitedata_c', Sitedata_c);

module.exports = {notes, User, Task_c, Sitedata_c};
