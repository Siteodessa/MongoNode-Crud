module.exports = (cf) =>{
    console.log('preparing custom routes...');
    let dbmodel = cf.dbmodel;
    let app = cf.app;
    let express = cf.express;
    let sitedata = cf.sitedata;

     app.get('/doma/:page_link',  function(req, res) {
          dbmodel.find().then(notes => {
            elemo = null
            notes.forEach(elem => {
              if (elem.page_link == req.params.page_link) {
                    elemo = elem

              }
          });
            elemo.sitedata = sitedata
            res.render('pages/listings_single.ejs', {d: elemo})
          }).catch(err => {
          res.send({
          message: err.message || "Some error occurred while retrieving notes."
          }); });
     });



cf.homepage('5b59c5414b38dd34d80410bd', '/', 'pages/home.ejs', app, dbmodel, express,  cf.IsParseableJson)
cf.express_page('5b59c5414b38dd34d80410bd', '/stroyaschiesya-doma', 'pages/listings.ejs', app, dbmodel, express,  cf.IsParseableJson)
cf.express_page('5b59c5414b38dd34d80410bd', '/sdannye-doma', 'pages/listings.ejs', app, dbmodel, express,  cf.IsParseableJson)
cf.express_page('5b59c5414b38dd34d80410bd', '/tseni', 'pages/news.ejs', app, dbmodel, express,  cf.IsParseableJson)
cf.express_page('5b59c5414b38dd34d80410bd', '/onas', 'pages/about.ejs', app, dbmodel, express,  cf.IsParseableJson)
cf.express_page('5b59c5414b38dd34d80410bd', '/contacts', 'pages/contacts.ejs', app, dbmodel, express,  cf.IsParseableJson)
cf.express_page('5b59c5414b38dd34d80410bd', '/altair', 'pages/single.ejs', app, dbmodel, express,  cf.IsParseableJson)
cf.express_page('5b59c5414b38dd34d80410bd', '/elements', 'pages/elements.ejs', app, dbmodel, express,  cf.IsParseableJson)


};
