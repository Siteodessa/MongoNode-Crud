console.log('body-parser...');
const bodyParser = require('../../../node_modules/body-parser');


console.log('custom_functions...');

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
function express_page(db_id, pageurl, ejs_file, app, dbmodel, express,  IsParseableJson, sitedata){
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
res.status(200).render(ejs_file, {
d: d,
sitedata: sitedata
});
});
});
}

function is_empty(obj) {
  if (obj === '') return true
                 return false
}
function is_undefined(obj) {
if (typeof obj === 'undefined') return true
                                return false
}
function is_empty_or_undefined(obj) {
  if (is_empty(obj) || is_undefined(obj)) return true
                                          return false
}



  function is_LoggedIn(req) {
       if (req.session.user) { return true};return false;
    }
  function redirect_to_login(res) {
      return res.status(301).redirect('/login');
    }



  let default_data = { sitename: 'Budova partners'};





var custom_functions = {}
custom_functions.type_n_log = type_n_log;
custom_functions.IsParseableJson = IsParseableJson;
custom_functions.json_Result = json_Result;
custom_functions.express_page = express_page;
// custom_functions.homepage = homepage;
custom_functions.bodyParser = bodyParser;
custom_functions.default_data = default_data;
custom_functions.is_LoggedIn = is_LoggedIn;
custom_functions.redirect_to_login = redirect_to_login;
custom_functions.is_empty = is_empty;
custom_functions.is_undefined = is_undefined;
custom_functions.is_empty_or_undefined = is_empty_or_undefined;

module.exports = custom_functions;
