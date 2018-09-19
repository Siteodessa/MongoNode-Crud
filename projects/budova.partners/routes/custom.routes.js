module.exports = (cf) =>{
    console.log('custom routes...');
    let note_model = cf.note_model;
    let app = cf.app;
    let express = cf.express;
    let sitedata = cf.sitedata.project;


     app.get('/doma/:page_link',  function(req, res) {
          note_model.find().then(notes => {
            d = null
            notes.forEach(elem => {
              if (elem.page_link == req.params.page_link) {
                    d = elem;
              }
          });




          note_model.find({title: d.title}).then(notes => {
            let note = notes[0]
            note.counter++
            note_model.findByIdAndUpdate(note.id, {counter:note.counter}, {new: true})    .then(note => {
                console.log(d.title + ' was visited ' + note.counter + ' times');
            });
          }).catch(err => { console.log(err); })



            res.render('pages/listings_single.ejs', {d: d, sitedata: sitedata})
          }).catch(err => {
          res.send({
          message: err.message || "Some error occurred while retrieving notes."
          }); });
     });



cf.homepage('5b59c5414b38dd34d80410bd', '/', 'pages/home.ejs', app, note_model, express,  cf.IsParseableJson, sitedata)
cf.express_page('5b59c5414b38dd34d80410bd', '/stroyaschiesya-doma', 'pages/listings.ejs', app, note_model, express,  cf.IsParseableJson, sitedata)
cf.express_page('5b59c5414b38dd34d80410bd', '/sdannye-doma', 'pages/listings.ejs', app, note_model, express,  cf.IsParseableJson, sitedata)
cf.express_page('5b59c5414b38dd34d80410bd', '/tseni', 'pages/news.ejs', app, note_model, express,  cf.IsParseableJson, sitedata)
cf.express_page('5b59c5414b38dd34d80410bd', '/onas', 'pages/about.ejs', app, note_model, express,  cf.IsParseableJson, sitedata)
cf.express_page('5b59c5414b38dd34d80410bd', '/contacts', 'pages/contacts.ejs', app, note_model, express,  cf.IsParseableJson, sitedata)
cf.express_page('5b59c5414b38dd34d80410bd', '/altair', 'pages/single.ejs', app, note_model, express,  cf.IsParseableJson, sitedata)
cf.express_page('5b59c5414b38dd34d80410bd', '/elements', 'pages/elements.ejs', app, note_model, express,  cf.IsParseableJson, sitedata)


};
