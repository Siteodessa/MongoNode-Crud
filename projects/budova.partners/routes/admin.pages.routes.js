    module.exports = (app, is_LoggedIn, redirect_to_login) => {

app.get('/profile', function(req, res){
    if (!is_LoggedIn(req)) { return redirect_to_login(res) }

    return res.status(200).render('dashboardUser.ejs', {
    user: req.session.user,
    dash_sub: 'profile',

  });

})


app.get('/platform_settings', function(req, res){
    if (!is_LoggedIn(req)) { return redirect_to_login(res) }
    const Sitedata = require('../db/models/sitedata.model.js');
    Sitedata.find()
    .then(site_data => {
    return res.status(200).render('dashboardUser.ejs', {
    user: req.session.user,
    dash_sub: 'settings',
    sitedata_schema: Sitedata.schema,
    site_data: site_data,
  });
}).catch(err => { })

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



app.get('/news', function(req, res){
  if (!is_LoggedIn(req)) { return redirect_to_login(res) }
  const Note = require('../db/models/note.model.js');
  Note.find()
  .then(notes => {
    return res.status(200)
    .render('dashboardUser.ejs', {
    user: req.session.user,
    schema: Note.schema,
    dash_sub: 'news',
    content: notes
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
      })
});


app.get('/pages', function(req, res){
  if (!is_LoggedIn(req)) { return redirect_to_login(res) }
  const Note = require('../db/models/note.model.js');
  Note.find()
  .then(notes => {
    return res.status(200)
    .render('dashboardUser.ejs', {
    user: req.session.user,
    schema: Note.schema,
    dash_sub: 'pages',
    content: notes
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
      })
});


app.get('/dashboard', function(req, res){
    if (!req.session.user) { return redirect_to_login(res) }
    user = req.session.user;
    if (user.isSU)
    return res.status(200).render('dashboard.ejs', { user : user, profile_page: false});
          if (user)
    return res.status(200).render('dashboardUser.ejs', { user : user,   dash_sub: 'content'});
})




app.get('/edit_reviews', function(req, res){
  if (!is_LoggedIn(req)) { return redirect_to_login(res) }
  const Review = require('../db/models/review.model.js');
  Review.find()
  .then(reviews => {
    return res.status(200).render('dashboardUser.ejs', {
      user: req.session.user,
      schema: Review.schema,
      dash_sub: 'reviews',
      content: reviews
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving notes."
    });
  })
});
}
