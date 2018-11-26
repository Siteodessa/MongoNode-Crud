const Note = require('../db/models/note.model.js');
function transliterate(word){
  var a = {"Ё":"yo","Й":"i","Ц":"ts","У":"u","К":"k","Е":"e","Н":"n","Г":"g","Ш":"sh","Щ":"sch","З":"z","Х":"h","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"f","Ы":"i","В":"v","А":"a","П":"p","Р":"r","О":"o","Л":"l","Д":"D","Ж":"zh","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"yu","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};
  return word.split('').map(function (char) {
    return a[char] || char;
  }).join("");
}

function remove_quotation_at_end(a){
  if (typeof a !== 'undefined' && a[a.length - 1] === '"' || a[a.length - 1] === "'") return a.slice(0, -1);
  return a
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
function remove_symbols(word){
   newstr = word.replace('*', '');
   newstr = newstr.replaceAll(' ', '');
   newstr = newstr.replace('/', '');
   newstr = newstr.replace('\\', '');
   newstr = newstr.replace('%', '');
   newstr = newstr.replace('', '');
   newstr = newstr.replace('@', '');
   newstr = newstr.replace('#', '');
   newstr = newstr.replace('$', '');
   newstr = newstr.replace('^', '');
   newstr = newstr.replace('*', '');
   newstr = newstr.replace('(', '');
   newstr = newstr.replace(')', '');
   newstr = newstr.replace('%20', '');
  return newstr
}
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
function handle_background(req) {
 return req.body.home_background
}
function handle_page_link(req) {
 let page_link = req.body.title;
 page_link = remove_symbols(page_link);
 page_link = transliterate(page_link);
 page_link = remove_quotation_at_end(page_link);
 return page_link;
}
exports.upload = (req, res) => {
}
exports.findOnePage = (req, res) => {// Find a single note with a noteId
     Note.find()
    .then(notes => {
      elemo = null;
      notes.forEach(elem => {
      if (elem.page_link == req.params.page_link) {
      elemo =  elem
      }
       });
       return elemo
    }).catch(err => {
        res.send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
 };
exports.create = (req, res) => {
let the_data = req.body
  /* Fix Duplicated radio inputs that occur during request */ for (let prop in the_data) { if ( the_data[prop][1] && the_data[prop][0] === the_data[prop][1] && !the_data[prop][2]) { the_data[prop] = the_data[prop][0] } }
 the_data.home_background = handle_background(req);
 the_data.page_link = handle_page_link(req);
if (the_data.page_link) the_data.page_link = remove_quotation_at_end(the_data.page_link)
console.log(the_data.content);
    const note = new Note(the_data);
    note.save()    // Save Note in the database
    .then(data => {
      res.send(JSON.stringify(data));
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};
exports.findAll = (req, res) => { // Retrieve and return all notes from the database.
    Note.find()
    .then(notes => {
        res.status(200).send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};
exports.findOne = (req, res) => {// Find a single note with a noteId
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};


function remove_duplicates(the_data) {
  for (let prop in the_data) {
     if (the_data[prop][1] && the_data[prop][0] === the_data[prop][1]) { the_data[prop] = the_data[prop][0] }
     if (the_data[prop].split(',') && the_data[prop].split(',')[0] === the_data[prop].split(',')[1]) { the_data[prop] = the_data[prop].split(',')[0] }
   }
   return the_data
}

function filter_image_field(image_string) {
   return image_string.replace(/\\n/g, '').replace('"', '').replace('  ', ' ').replace(/\r?\n/g, "").replace('  ', ' ').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '')
}
function filter_image_field2(image_string) {
   return image_string.replace(/\\n/g, '').replace('"', '').replace(/\r?\n/g, "").replaceAll(' ', '')
}
function filter_galery_field_untested(image_string) {
   return image_string.replace(/\//g, '').replace('"', '').replace(/\r?\n/g, "").replaceAll(' ', '')
}






exports.custom_update = (req, res) => {
let the_data = req.body;


if (typeof the_data["home_background"] !== 'undefined') the_data["home_background"] = filter_image_field(the_data["home_background"])
if (typeof the_data["gallery"] !== 'undefined') the_data["gallery"] = the_data["gallery"]
if (typeof the_data["prices_start_at_per_meter"] !== 'undefined') the_data["prices_start_at_per_meter"] = the_data["prices_start_at_per_meter"]

if (the_data.page_link) the_data.page_link = remove_quotation_at_end(the_data.page_link)
if (the_data.content) the_data.content = remove_quotation_at_end(the_data.content)
    Note.findByIdAndUpdate(req.params.noteId, the_data, {new: true})
    .then(note => {


        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(the_data);
    }).catch(err => {
      console.log(err);
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        if(err.kind === 'number') {
let cf = require('./custom_functions');
            return res.status(500).send('В поле "Цены стартуют от" должно быть указано число!');
        }
else {
  return res.status(500).send({
      message: "Error updating note with id " + req.params.noteId
  });
}
    });
};



exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    Note.findByIdAndUpdate(req.params.noteId, {
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(200).send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(200).send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};
