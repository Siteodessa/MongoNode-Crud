
  function checkFileType(file, cb, path){
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


    module.exports = (app, is_LoggedIn, redirect_to_login) => {



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
          checkFileType(file, cb, path);
          }
        }).single('imageUpload');

          app.get('/media_upload', (req, res) =>        { if (!is_LoggedIn(req)) { return redirect_to_login(res) }; res.render('image_uploader_prototype.ejs')});

          app.post('/media_uploader', function(req, res){
          if (!is_LoggedIn(req)) { return redirect_to_login(res) }

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
                    msg: `${req.file.filename}`,
                    file: `uploads/${req.file.filename}`
                  });
                }
              }
            });
          })


};
