    module.exports = (app, is_LoggedIn, redirect_to_login) => {

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
app.get('/dashboard', function(req, res){
    if (!req.session.user) { return redirect_to_login(res) }
    user = req.session.user;
    if (user.isSU)
    return res.status(200).render('dashboard.ejs', { user : user, profile_page: false});
          if (user)
    return res.status(200).render('dashboardUser.ejs', { user : user,   dash_sub: 'content'});
})

}
