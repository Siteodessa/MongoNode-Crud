

const Sitedata = require('../db/models/sitedata.model.js');


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




function registerSiteData(User, user){
  User.findOne({
    username:user.username,
  }, function(err,usero){
    if (err) {console.log(err); }
  if (!usero) {
user.save(function(err, savedUser){ if (err) {  console.log(err);}
console.log(user.username + ' has been registered');
}
)
  }
})
}
module.exports = registerSiteData
