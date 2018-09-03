module.exports = (cf)=>{
  console.log('preparing admin pages...');
  function is_LoggedIn(req) {
       if (req.session.user) { return true};return false;
    }
  function redirect_to_login(res) {
      return res.status(301).redirect('/login');
    }
  function checkFileType(file, cb){
      // Allowed ext
      const filetypes = /jpeg|jpg|png|gif/;
      // Check ext
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      // Check mime
      const mimetype = filetypes.test(file.mimetype);

      if(mimetype && extname){
        return cb(null,true);
      } else {
        cb('Error: Images Only!');
      }
    }

  var session  = require('express-session');
  var fs  = require('fs');
  let app = cf.app;
  let express = cf.express;
  let User = cf.user;
  let json_Result = cf.json_Result;

  app.use(session({secret:"f254fr45t43ty5409143t91y4ty920ty123", resave:false, saveUninitialized:true}))
  app.use(express.static('views'));


app.use(express.static('./public'));












        var multer  = require('multer');
        const path = require('path');

        const storage = multer.diskStorage({
        destination: './public/uploads/',
          filename: function(req, file, cb){
          cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
          }
        });

        const upload = multer({
        storage: storage,
        limits:{fileSize: 1000000},
        fileFilter: function(req, file, cb){
        checkFileType(file, cb);
        }
      }).single('imageUpload');

        app.get('/media_upload', (req, res) => res.render('image_uploader_prototype.ejs'));

        app.post('/media_uploader', function(req, res){


          upload(req, res, (err) => {
            if(err){
              res.render('image_uploader_prototype.ejs', {
                msg: err
              });
            } else {
              if(req.file == undefined){
                res.render('image_uploader_prototype.ejs', {
                  msg: 'Error: No File Selected!'
                });
              } else {
                res.render('image_uploader_prototype.ejs', {
                  msg: ' ',
                  file: `uploads/${req.file.filename}`
                });
              }
            }
          });
        })















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

  app.get('/profile', function(req, res){
        if (!is_LoggedIn(req)) { return redirect_to_login(res) }
        return res.status(200).render('dashboardUser.ejs', {
        user: req.session.user,
        dash_sub: 'profile',
      });
  })

  app.get('/objects', function(req, res){
      if (!is_LoggedIn(req)) { return redirect_to_login(res) }
      const Note = require('../db/models/note.model.js');
      Note.find()
      .then(notes => {
        return res.status(200)
        .render('dashboardUser.ejs', {
        user: req.session.user,
        schema: Note.schema,
        dash_sub: 'objects',
                content: notes
              });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
          })
  });

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
        if (!req.session.user) { return redirect_to_login(res) }
        user = req.session.user;
        if (user.isSU)
        return res.status(200).render('dashboard.ejs', { user : user, profile_page: false});
              if (user)
        return res.status(200).render('dashboardUser.ejs', { user : user,   dash_sub: 'content'});
  })

};
