

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
username: {type: String, unique: true},
password: {type: String},
email: { type: String, default: '' },
phone: { type: String, default: '' },
liked: { type: Number, default: 0 },
image: { type: String, default: '/images/lama.jpg' },
contacts: { type: String, default: '' },
content: { type: String, default: '' },
gallery: {type: Array},
address: { type: String, default: '' },
gender    : { type: String, enum: ['male', 'female'], default: 'male' },
age       : { type: Number, default: 21 },
isSU: { type: Boolean, default: 'false' },
user_role: { type: String, enum: ['Admin', 'SeoAdmin', 'Business_Owner', 'Designer', 'Developer', 'User', 'Project_Manager', 'Manager', 'Content-Producer', 'Partner'], default: 'User' },
})




module.exports = mongoose.model('User', userSchema);
