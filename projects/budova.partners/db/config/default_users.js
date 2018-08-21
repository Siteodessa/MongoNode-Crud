var User = require('../models/user.model.js');
var default_users =  {
  lama: new User({
    username : "Lama",
    password : "1771Donttellanyone",
    email : "siteodessa.com@gmail.com",
    liked : 2,
    image : "https://thumbs.dreamstime.com/b/cartoon-hologram-lama-character-vector-illustration-funny-animal-print-card-funny-quote-print-cute-pink-fluffy-llama-alpaca-112816041.jpg",
    content : "@lama : Web Developer. Please contact me at siteodessa.com@gmail.com",
    gallery : "Lama",
    gender : 'male',
    isAdmin: true,
    isSU: true,
    age : 21
  }),
  anna : new User({
    username : "Anna",
    password : "Do42s4sh72",
    email : "",
    liked : 2,
    image : "https://thumbs.dreamstime.com/b/cartoon-hologram-lama-character-vector-illustration-funny-animal-print-card-funny-quote-print-cute-pink-fluffy-llama-alpaca-112816041.jpg",
    content : "@Anna : Manager",
    gallery : "Anna",
    gender : 'female',
    isAdmin: true,
    isSU: false,
    age : 21
  })
}
var registerUser = require('../../controllers/user.controller.js');
for (let user in default_users) {
  registerUser(User, default_users[user])
  }
module.exports = default_users;
