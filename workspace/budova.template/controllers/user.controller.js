function registerUser(User, user){
  User.findOne({
    username:user.username,
  }, function(err,usero){
    if (err) {console.log(err); }
  if (!usero) {
user.save(function(err, savedUser){ if (err) {  console.log(err);}
console.log(user.username + ' has been registered');
}
)
  }
})
}
module.exports = registerUser
