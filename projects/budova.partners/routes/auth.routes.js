    module.exports = (app, is_LoggedIn, redirect_to_login, cf) => {

  let json_Result = cf.json_Result;
  let User = cf.user;
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

}
