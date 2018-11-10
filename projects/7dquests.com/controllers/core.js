const bodyParser = require('body-parser');
console.log('preparing core...');

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

  function homepage(db_id, pageurl, ejs_file, app, dbmodel, express,  IsParseableJson){
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
    d.sitename = 'Budova.Partners'
    res.status(200).render(ejs_file, {
    d: d,
    content: data
    });
    });
    });
  }

    function is_LoggedIn(req) {
         if (req.session.user) { return true};return false;
      }
      function redirect_to_login(res) {
          return res.status(301).redirect('/login');
        }



    function express_page(db_id, pageurl, ejs_file, app, dbmodel, express,  IsParseableJson, reviews_m){
      app.get(pageurl, function(req, res) {
      d = {};
      const Reviews_m = require('../db/models/reviews.model');
      const Quests_m = require('../db/models/quest.model');
      dbmodel.find().then(data => {
      Reviews_m.find().then(reviews => {
      Quests_m.find().then(quests => {
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
        d: d,
        reviews: reviews,
        quests: quests,
        notes: data

        });
        });
      })
      })
      dbmodel.find({}, function(err, data) {

      });
      });
    }




  let default_data = { sitename: 'Budova partners'};





var core = {}
core.type_n_log = type_n_log;
core.IsParseableJson = IsParseableJson;
core.bodyParser = bodyParser;
core.json_Result = json_Result;
core.express_page = express_page;
core.homepage = homepage;
core.bodyParser = bodyParser;
core.default_data = default_data;
core.is_LoggedIn = is_LoggedIn;
core.redirect_to_login = redirect_to_login;

module.exports = core;
