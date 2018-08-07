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
module.exports = (app, express, bodyParser) => {
var dbmodel = require('../../db/models/note.model.js');
const notes = require('../controllers/note.controller.js');
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.post('/notes', notes.create);
  app.get('/notes', notes.findAll);
  app.get('/notes/:noteId', notes.findOne);
  app.put('/notes/:noteId', notes.update);
  app.put('/notes/m_update/:noteId', notes.custom_update);
  app.delete('/notes/:noteId', notes.delete);
  app.set('view engine', 'ejs');
    app.get('/', function(req, res) {
        d = {};
        dbmodel.find({}, function(err, data) {
              app.use(express.static('views'));
            data.forEach(elem => {
              if (elem.id == '5b59c5414b38dd34d80410bd')
              for (let prop in elem) {
                  if (IsParseableJson(elem[prop])) {   d[prop] = JSON.parse(elem[prop]) }
                  else { d[prop] = elem[prop] }
                }
              }
            );

for (let item in d.useful_links_menu_list) {
  type_n_log(item);
  }
            res.status(200).render('index.ejs', {
                d: d
            });
        });
    });
app.listen(80, () => console.log(' application is running port 80!'));
}
