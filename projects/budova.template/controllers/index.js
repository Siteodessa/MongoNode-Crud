console.log('controller...');

const notes = require('./note.controller.js');
const User = require('./user.controller.js');
const Task_c = require('./task.controller.js');


module.exports = {notes, User, Task_c};
