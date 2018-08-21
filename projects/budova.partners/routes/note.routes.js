function type_n_log(a) {
  let b = typeof(a);
  console.log(b);
  console.log("~~~~~~~~");
  console.log(a);
  console.log("~~~~~~~~");
  for (let prop in a) {
    console.log(prop);
  }
}
function IsParseableJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function json_Result(string){
  let obj = { result: string};
  let myJSON = JSON.stringify(obj);
  return myJSON;
}
function express_page(db_id, pageurl, ejs_file, app, dbmodel, express,  IsParseableJson){
  app.get(pageurl, function(req, res) {
      d = {};
      dbmodel.find({}, function(err, data) {
          app.use(express.static('views'));
          data.forEach(elem => {
            if (elem.id == db_id)
            for (let prop in elem) {
                if (IsParseableJson(elem[prop])) {   d[prop] = JSON.parse(elem[prop]) }
                else { d[prop] = elem[prop] }
              }
            }
          );

          res.status(200).render(ejs_file, {
              d: d
          });
      });
  });
}



module.exports = (app, express, bodyParser) => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  var dbmodel = require('../db/models/note.model.js');
  var User = require('../db/models/user.model.js');
  const notes = require('../controllers/note.controller.js');
  var session  = require('express-session');
    app.use(session({secret:"f254fr45t43ty5409143t91y4ty920ty123", resave:false, saveUninitialized:true}))
//LOGIN-REGISTER

  app.get('/dashboard', function(req, res){
    if (!req.session.user) {
      return res.status(401).send();
    }
    return res.status(200).send("Welcome to super-secret API")
  })

  app.get('/enter', function(req, res){
    // if (!req.session.user) {
    //   return res.status(401).send();
    // }
    return res.status(200).render('login.ejs', {

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



//LOGIN-REGISTER



app.post('/logout', function(req, res) {
  req.session.destroy()
  res.status(200).send()
})




  app.post('/notes', notes.create);
  app.get('/notes', notes.findAll);
  app.get('/notes/:noteId', notes.findOne);
  app.put('/notes/:noteId', notes.update);
  app.put('/notes/m_update/:noteId', notes.custom_update);
  app.delete('/notes/:noteId', notes.delete);
  app.set('view engine', 'ejs');


express_page('5b59c5414b38dd34d80410bd', '/', 'pages/home.ejs', app, dbmodel, express,  IsParseableJson)
express_page('5b59c5414b38dd34d80410bd', '/stroyaschiesya-doma', 'pages/listings.ejs', app, dbmodel, express,  IsParseableJson)
express_page('5b59c5414b38dd34d80410bd', '/sdannye-doma', 'pages/listings.ejs', app, dbmodel, express,  IsParseableJson)
express_page('5b59c5414b38dd34d80410bd', '/tseni', 'pages/news.ejs', app, dbmodel, express,  IsParseableJson)
express_page('5b59c5414b38dd34d80410bd', '/onas', 'pages/about.ejs', app, dbmodel, express,  IsParseableJson)
express_page('5b59c5414b38dd34d80410bd', '/contacts', 'pages/contacts.ejs', app, dbmodel, express,  IsParseableJson)
//Warning !  pages, including db loops must be reworked and must be able to create a new page
express_page('5b59c5414b38dd34d80410bd', '/altair', 'pages/single.ejs', app, dbmodel, express,  IsParseableJson)
express_page('5b59c5414b38dd34d80410bd', '/elements', 'pages/elements.ejs', app, dbmodel, express,  IsParseableJson)



app.listen(80, () => console.log('app:ok'));
}
