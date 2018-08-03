const Note = require('../models/note.model.js');

function try_jsonparse(d, str_or_arr) {
  try {
  var d_field = JSON.parse("[" + d[str_or_arr] + "]");
      return d_field;
  } catch (err) {
    return d[str_or_arr];
  }
}
function type_n_log(additional_details) {
  console.log(additional_details);
  console.log(typeof(additional_details));
}


Note.find()
.then(notes => {
  var d = {}
notes.forEach(elem => {
  for (let prop in elem) {
  d[prop] = try_jsonparse(notes[0], prop)
  }
});



type_n_log(d.title)


module.exports = d;
}).catch(err => {
res.status(500).send({
message: err.message || "Db error."
});
});
