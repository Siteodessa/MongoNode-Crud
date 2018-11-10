module.exports = (cf) =>{
    console.log('custom routes...');
    let note_model = cf.note_model;
    let app = cf.app;
    let express = cf.express;
    let sitedata = cf.sitedata.project;


     app.get('/doma/:page_link',  function(req, res) {
          note_model.find().then(notes => {
              d = null; notes.forEach(elem => { if (elem.page_link == req.params.page_link) { d = elem; } });
            note_model.find({title: d.title}).then(notes => { let note = notes[0]; note.counter++; note_model.findByIdAndUpdate(note.id, {counter:note.counter}, {new: true})    .then(note => { console.log(d.title + ' was visited ' + note.counter + ' times'); }); }).catch(err => { console.log(err); })
              res.render('pages/listings_single.ejs', {d: d, sitedata: sitedata})
            }).catch(err => { res.send({ message: err.message || "Some error occurred while retrieving notes." });
          });
     });



     function express_page(pageurl, ejs_file, cf){
       let app = cf.app;
       let express = cf.express;
           app.get(pageurl, function(req, res) {
             d = {};
             d.sitename = 'Budova.Partners'
             let Note_m = require('../db/models/note.model');
             let Review_m = require('../db/models/review.model');
              Review_m.find({}, function(err, reviews) {
                  Note_m.find({}, function(err, content) {
                  app.use(express.static('views'));
                  res.status(200).render(ejs_file, {
                    content: content,
                    sitedata: cf.sitedata.project,
                    reviews: reviews,
                  }); // res render
                }); // Note_m find
              }); // Review_m find
            }); //app.get
     }



express_page('/', 'pages/home.ejs', cf)
express_page('/stroyaschiesya-doma', 'pages/listings_new.ejs', cf)
express_page('/sdannye-doma', 'pages/listings_old.ejs', cf)
express_page('/tseni', 'pages/prices.ejs', cf)
express_page('/onas', 'pages/about.ejs', cf)
express_page('/contacts', 'pages/contacts.ejs', cf)
express_page('/altair', 'pages/single.ejs', cf)
express_page('/elements', 'pages/elements.ejs', cf)


};
