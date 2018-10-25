var User = require('../models/user.model.js');
var default_users =  {
  lama: new User({
    username : "Lama",
    password : "1771Donttellanyone",
    email : "siteodessa.com@gmail.com",
    liked : 2,
    phone: '+380936460780',
    image : "https://thumbs.dreamstime.com/b/cartoon-hologram-lama-character-vector-illustration-funny-animal-print-card-funny-quote-print-cute-pink-fluffy-llama-alpaca-112816041.jpg",
    content : "@lama : Web Developer. Please contact me at siteodessa.com@gmail.com",
    gallery : "Lama",
    gender : 'male',
    age : 29,
    isSU: true,
    user_role : 'Admin'
  }),
  anna : new User({
    username : "Anna",
    password : "Do42s4sh72",
    email : "",
    liked : 2,
        phone: '+38093000000',
    image : "https://thumbs.dreamstime.com/b/cartoon-hologram-lama-character-vector-illustration-funny-animal-print-card-funny-quote-print-cute-pink-fluffy-llama-alpaca-112816041.jpg",
    content : "@Anna : Manager",
    gallery : "Anna",
    gender : 'female',
    age : 21,
    isSU: false,
    user_role : 'Admin'
  })
}
var registerUser = require('../../controllers/user.controller.js');
for (let user in default_users) {
  registerUser(User, default_users[user])
  }
module.exports = default_users;
