

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
username: {type: String, unique: true},
password: {type: String},
firstname: String,
lastname: String,

})

// {
// 	"username":"manhattan",
// 	"password":"passwpasswordord123",
// 	"firstname":"firstname547",
// 	"lastname":"lastname754"
// }

module.exports = mongoose.model('User', userSchema);
