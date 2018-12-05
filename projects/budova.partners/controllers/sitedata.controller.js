


const Sitedata = require('../db/models/sitedata.model.js');

exports.findAll = (req, res) => { // Retrieve and return all reviews from the database.
    Sitedata.find()
    .then(reviews => {
        res.status(200).send(reviews);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving reviews."
        });
    });
};



exports.custom_update = (req, res) => {
let the_data = req.body;


if (typeof the_data["home_background"] !== 'undefined') the_data["home_background"] = filter_image_field(the_data["home_background"])
if (typeof the_data["gallery"] !== 'undefined') the_data["gallery"] = the_data["gallery"]
if (typeof the_data["prices_start_at_per_meter"] !== 'undefined') the_data["prices_start_at_per_meter"] = the_data["prices_start_at_per_meter"]

if (the_data.page_link) the_data.page_link = remove_quotation_at_end(the_data.page_link)
if (the_data.content) the_data.content = remove_quotation_at_end(the_data.content)

console.log(the_data["contacts_page_about_map"]);
    Sitedata.findByIdAndUpdate(req.params.noteId, the_data, {new: true})
    .then(note => {


        if(!note) {
            return res.status(404).send({
                message: "Sitedata not found with id " + req.params.noteId
            });
        }
        res.send(the_data);
    }).catch(err => {
      console.log(err);
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Sitedata not found with id " + req.params.noteId
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
