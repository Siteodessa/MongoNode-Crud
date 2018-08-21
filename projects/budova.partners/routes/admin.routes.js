module.exports = (app, User)=>{
  var session  = require('express-session');
  app.use(session({secret:"f254fr45t43ty5409143t91y4ty920ty123", resave:false, saveUninitialized:true}))
//LOGIN-REGISTER
  app.get('/dashboard', function(req, res){
    if (!req.session.user) {
      return res.status(401).send();
    }
              app.use(express.static('views'));
    return res.status(200).render('dashboard.ejs', {
    });
  })
  app.get('/login', function(req, res){
    // if (!req.session.user) {
    //   return res.status(401).send();
    // }
    return res.status(200).render('login.ejs', {
    });
  })
  app.get('/register', function(req, res){
    // if (!req.session.user) {
    //   return res.status(401).send();
    // }
    return res.status(200).render('register.ejs', {
    });
  })
app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({
    username:username,
    password:password,
  }, function(err,user){
        if (err) {
          let answer = 'Произошла ошибка';
          let json_result = json_Result(answer)
          return res.status(500).send(json_result)
        }
        if (!user) {
          let answer = 'Не существует пользователя с именем ' + username + '!';
          let json_result = json_Result(answer)
          return res.status(404).send(json_result);
        }
        req.session.user =  user;
        let answer = 'Добро пожаловать ' + username + '!';
        let json_result = json_Result(answer)
        return res.status(200).send(json_result);
      })
})
  app.post('/register', function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      var newuser = new User();
      newuser.username = username;
      newuser.password = password;
      User.findOne({
        username:username,
        password:password,
      }, function(err,user){
      if (!user) {
        newuser.save(function(err, savedUser){ if (err) {  console.log(err);  } })
            return res.status(200).send(json_Result('Поздравляем с успешной регистрацией, ' + username + '!'))
      }
      res.status(200).send(json_Result('Имя ' + username + ' уже занято!'));
    })
  });
app.post('/logout', function(req, res) {
  req.session.destroy()
  res.status(200).send()
})
//LOGIN-REGISTER

};
