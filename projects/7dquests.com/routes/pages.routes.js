module.exports = (core, dbmodel, quests_m, quests) => {
    let app = core.app;
    let express = core.express;
    let IsParseableJson = core.IsParseableJson;




      app.get('/quests', function(req, res) {
        app.use(express.static('views'));
        d = {};
        dbmodel.find({}, function(err, data) {
        data.forEach(elem => {
        if (elem.id == '5b59c5414b38dd34d80410bd')
        for (let prop in elem) {
        if (IsParseableJson(elem[prop])) {   d[prop] = JSON.parse(elem[prop]) }
        else { d[prop] = elem[prop] }
        }
        });
          quests_m.find()  .then(quests => {
            res.status(200).render('pages/quests_page.ejs', {
            d: d,
            quests_m: quests_m,
            quests: quests
            });
          });
        });
      })


    core.express_page('5b59c5414b38dd34d80410bd', '/', 'pages/home.ejs', app, dbmodel, express,  IsParseableJson)
    core.express_page('5b59c5414b38dd34d80410bd', '/special_offers', 'pages/special_offers.ejs', app, dbmodel, express,  IsParseableJson)
    core.express_page('5b59c5414b38dd34d80410bd', '/feedback', 'pages/feedback.ejs', app, dbmodel, express,  IsParseableJson)
    core.express_page('5b59c5414b38dd34d80410bd', '/about', 'pages/about.ejs', app, dbmodel, express,  IsParseableJson)
    core.express_page('5b59c5414b38dd34d80410bd', '/contacts', 'pages/contacts.ejs', app, dbmodel, express,  IsParseableJson)
}
