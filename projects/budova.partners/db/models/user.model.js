

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
username: {type: String, unique: true},
password: {type: String},
email: {type: String},
phone: {type: String},
liked: {type: String},
image: {type: String},
content: {type: String},
gallery: {type: Array},
gender    : { type: String, enum: ['male', 'female'], default: 'male' },
age       : { type: Number, default: 21 },
isSU: { type: Boolean, default: 'false' },
user_role: { type: String, enum: ['Admin', 'SeoAdmin', 'Business_Owner', 'Designer', 'Developer', 'User', 'Project_Manager', 'Manager', 'Content-Producer', 'Partner'], default: 'User' },
})




module.exports = mongoose.model('User', userSchema);
