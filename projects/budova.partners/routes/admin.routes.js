module.exports = (app, User, json_Result, express)=>{
  var session  = require('express-session');
  app.use(session({secret:"f254fr45t43ty5409143t91y4ty920ty123", resave:false, saveUninitialized:true}))
  function isLoggedIn(req, User) {
    if (req.session.user) {
      User.findOne({
        username:req.session.user,
      }, function(err,user){
        if (err) {console.log(err);
return false;
        } else {
          user = req.session.user
          return user;
        }
      })
    }
  }
  app.get('/register', function(req, res){
        return res.status(200).render('register.ejs', {
        });
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
  app.get('/login', function(req, res){
        return res.status(200).render('login.ejs', {
        user: req.session.user
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
              let json_result = json_Result('Произошла ошибка')
              return res.status(500).send(json_result)
             }
            if (!user) {
              let json_result = json_Result('Не существует пользователя с именем ' + username + '!')
              return res.status(404).send(json_result);
              }
            req.session.user =  user;
            let json_result = json_Result('Добро пожаловать ' + username + '!')
            return res.status(200).send(json_result);
            })})
app.post('/logout', function(req, res) {
      req.session.destroy()
      res.status(200).send()
})
app.get('/logout', function(req, res) {
        user = req.session.user;
      req.session.destroy()
  return res.status(200).render('logout.ejs', { user : user, });
})
app.get('/dashboard', function(req, res){
      if (!req.session.user) {
      return res.status(401).send();
    } else {
      user = req.session.user;
    }
      app.use(express.static('views'));
      if (user.isSU)
      return res.status(200).render('dashboard.ejs', { user : user, });
      if (user.user_role == 'Admin')
      return res.status(200).render('dashboardAdmin.ejs', { user : user, });
      if (user.user_role == 'User' || user.user_role == 'Пользователь')
      return res.status(200).render('dashboardUser.ejs', { user : user, });
})
//LOGIN-REGISTER
};
