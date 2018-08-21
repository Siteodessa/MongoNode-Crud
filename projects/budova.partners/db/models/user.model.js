

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
username: {type: String, unique: true},
password: {type: String},
email: {type: String},
liked: {type: String},
image: {type: String},
content: {type: String},
gallery: {type: Array},
gender    : { type: String, enum: ['male', 'female'], default: 'male' },
age       : { type: Number, default: 21 },
isAdmin: { type: Boolean, default: 'false' },
isSU: { type: Boolean, default: 'false' },
})

// {
// 	"username":"manhattan",
// 	"password":"passwpasswordord123",
// 	"firstname":"firstname547",
// 	"lastname":"lastname754"
// }



module.exports = mongoose.model('User', userSchema);
