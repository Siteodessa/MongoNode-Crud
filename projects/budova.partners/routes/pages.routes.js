module.exports = (cf) =>{
    console.log('custom routes...');
    let note_model = cf.note_model;
    let app = cf.app;
    let express = cf.express;
    let sitedata = cf.sitedata.project;



     function homepage(pageurl, ejs_file, cf){
       let app = cf.app;
       let express = cf.express;
           app.get(pageurl, function(req, res) {
           d = {};
           let Note_m = require('../db/models/note.model');
           let Review_m = require('../db/models/review.model');
            Review_m.find({}, function(err, reviews) {
                Note_m.find({}, function(err, content) {
                   content.forEach(elem => { if (elem.title.includes('Главная')) { d = elem; } });
                app.use(express.static('views'));
                res.status(200).render(ejs_file, {
                  content: content,
                  sitedata: cf.sitedata.project,
                  reviews: reviews,
                  d: d,
                }); // res render
              }); // Note_m find
            }); // Review_m find
          }); //app.get
     }
homepage('/', 'pages/home.ejs', cf)





     app.get('/doma/:page_link',  function(req, res) {
          note_model.find().then(notes => {
              d  = null;  notes.forEach(elem => { if (elem.page_link == req.params.page_link) { d = elem;} });
            note_model.find({title: d.title}).then(notes => {   let note = notes[0]; note.counter++; note_model.findByIdAndUpdate(note.id, {counter:note.counter}, {new: true})    .then(note => { console.log(d.title + ' was visited ' + note.counter + ' times'); }); }).catch(err => { console.log(err); })
              res.render('pages/listings_single.ejs', {d: d, sitedata: sitedata, content: notes})
            }).catch(err => { res.send({ message: err.message || "Some error occurred while retrieving notes." });
          });
     });



     app.get('/novosti/:page_link',  function(req, res) {
          note_model.find().then(notes => {
              d  = null;  notes.forEach(elem => { if (elem.page_link == req.params.page_link) { d = elem;} });
            note_model.find({title: d.title}).then(notes => {   let note = notes[0]; note.counter++; note_model.findByIdAndUpdate(note.id, {counter:note.counter}, {new: true})    .then(note => { console.log(d.title + ' was visited ' + note.counter + ' times'); }); }).catch(err => { console.log(err); })
              res.render('pages/news_single.ejs', {d: d, sitedata: sitedata, content: notes})
            }).catch(err => { res.send({ message: err.message || "Some error occurred while retrieving notes." });
          });
     });


  app.get('/:page_link',  function(req, res) {
      let Note_m = require('../db/models/note.model');
      let Review_m = require('../db/models/review.model');
      d = null;
      Note_m.find().then(notes => {
        d = null; notes.forEach(elem => { if (elem.page_link == req.params.page_link) { d = elem; } });
        Note_m.find({title: d.title}).then(notes => { let note = notes[0]; note.counter++; Note_m.findByIdAndUpdate(note.id, {counter:note.counter}, {new: true})    .then(note => { console.log(d.title + ' was visited ' + note.counter + ' times'); }); }).catch(err => { console.log(err); })

        Review_m.find().then(reviews => {
              app.use(express.static('views'));
              res.status(200).render(d.template_link, {
                content: notes,
                sitedata: cf.sitedata.project,
                reviews: reviews,
              }); // res render
        })

      }).catch(err => {
        res.status(404).send({
        message: err.message || "Страница недоступна"
        }); // Note_m find
    })
  })

};
