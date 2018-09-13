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
function express_page(db_id, pageurl, ejs_file, app, dbmodel, express,  IsParseableJson){
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
d: d
});
});
});
}
module.exports = (app, express, custom_functions) => {

  const bodyParser = require('../../../node_modules/body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

    var dbmodel = require('../db/models/note.model.js');
    var User = require('../db/models/user.model.js');
    const notes = require('../controllers/note.controller.js');
    const default_users = require('../db/config/default_users.js');

    const admin_router = require('./admin.routes.js')(app, User, json_Result, express, custom_functions);

    app.post('/notes', notes.create);
    app.get('/notes', notes.findAll);
    app.get('/notes/:noteId', notes.findOne);
    app.put('/notes/:noteId', notes.update);
    app.put('/notes/m_update/:noteId', notes.custom_update);
    app.delete('/notes/:noteId', notes.delete);


    express_page('5b59c5414b38dd34d80410bd', '/', 'pages/home.ejs', app, dbmodel, express,  IsParseableJson)
    express_page('5b59c5414b38dd34d80410bd', '/special_offers', 'pages/special_offers.ejs', app, dbmodel, express,  IsParseableJson)
    express_page('5b59c5414b38dd34d80410bd', '/feedback', 'pages/feedback.ejs', app, dbmodel, express,  IsParseableJson)
    express_page('5b59c5414b38dd34d80410bd', '/about', 'pages/about.ejs', app, dbmodel, express,  IsParseableJson)
    express_page('5b59c5414b38dd34d80410bd', '/quests', 'pages/quests_page.ejs', app, dbmodel, express,  IsParseableJson)
    express_page('5b59c5414b38dd34d80410bd', '/contacts', 'pages/contacts.ejs', app, dbmodel, express,  IsParseableJson)


app.listen(27, () => console.log('app:ok'));
}
