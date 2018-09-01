const Note = require('../db/models/note.model.js');


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
    // Create and Save a new Note
    // if(!req.body.content) {    // Validate request
    //     return res.status(400).send({
    //         message: "Note content can not be empty"
    //     });
    // }
    // Create a Note
    const note = new Note({
        title: req.body.title || "",
        home_title: req.body.home_title || "",
        page_link: req.body.page_link || "",
        content: req.body.content || "",
        home_background : req.body.home_background || "/images/city.jpg",
        breadcrumbs : req.body.breadcrumbs || "OOPS!!",
        main_nav_list : req.body.main_nav_list || "OOPS!!",
        phone : req.body.phone || "OOPS!!",
        logo : req.body.logo || "/images/logo.png",
        listing_title : req.body.listing_title || "OOPS!!",
        listing_text : req.body.listing_text || "OOPS!!",
        room_tags : req.body.room_tags || "OOPS!!",
        listing_price_col : req.body.listing_price_col || "OOPS!!",
        listing_slider : req.body.listing_slider || "OOPS!!",
        listing_details : req.body.listing_details || "OOPS!!",
        description : req.body.description || "OOPS!!",
        additional_details : req.body.additional_details || "OOPS!!",
        listing_video : req.body.listing_video || "OOPS!!",
        map : req.body.map || "OOPS!!",
        subscribe : req.body.subscribe || "OOPS!!",
        weekly_offer : req.body.weekly_offer || "OOPS!!",
        footer_social : req.body.footer_social || "OOPS!!",
        footer_about : req.body.footer_about || "OOPS!!",
        useful_links : req.body.useful_links || "OOPS!!",
        footer_col_title : req.body.footer_col_title || "OOPS!!",
        contact_info : req.body.contact_info || "OOPS!!",
        notes : req.body.notes || "OOPS!!",
        dbtest : req.body.dbtest || "OOPS!!",
        content: req.body.content || "OOPS!!",
        floors_quant : req.body.floors_quant || '1',
        sections_quant : req.body.sections_quant || '1',
        appart_on_floor_quant : req.body.appart_on_floor_quant || '4',
        construction_type : req.body.construction_type || 'Монолитный каркас',
        frontend_material : req.body.frontend_material || 'Штукатурка',
        walls : req.body.walls || 'Газобетон 40 см / Газобетон 20 см',
        windows : req.body.windows || 'Евробрус',
        floor_height : req.body.floor_height || '3',
        warming : req.body.warming || 'Котельная на крыше',
        elevator : req.body.elevator || 'Пассажирский / Грузовой',
        parking : req.body.parking || 'Подземный',
        bldr : req.body.bldr || 'Будова',
        block : req.body.block || 'Приморский',
        content : req.body.content || ' '
    });
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
exports.custom_update = (req, res) => {

var the_data = '';
for (let prop in req.body) {

  if (!JSON.parse(req.body[prop])){console.error('ERO');}
  the_data = JSON.parse(prop)
}
delete the_data["noteId"];
    Note.findByIdAndUpdate(req.params.noteId, the_data, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(200).send(the_data);
        for (var member in myObject) delete myObject[member];
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


exports.update = (req, res) => {// Update a note identified by the noteId in the request
    if(!req.body.content) {    // Validate Request
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    Note.findByIdAndUpdate(req.params.noteId, {
      // title: req.body.title || "Budova.partners",
      // home_title: req.body.home_title || "SINGLE LISTING",
      // content: req.body.content || "OOPS!!",
      // home_background : req.body.home_background || "OOPS!!",
      // breadcrumbs : req.body.breadcrumbs || "OOPS!!",
      // main_nav_list : req.body.main_nav_list || "OOPS!!",
      // phone : req.body.phone || "OOPS!!",
      // logo : req.body.logo || "OOPS!!",
      // listing_title : req.body.listing_title || "OOPS!!",
      // listing_text : req.body.listing_text || "OOPS!!",
      // room_tags : req.body.room_tags || "OOPS!!",
      // listing_price_col : req.body.listing_price_col || "OOPS!!",
      // listing_slider : req.body.listing_slider || "OOPS!!",
      // listing_details : req.body.listing_details || "OOPS!!",
      // description : req.body.description || "OOPS!!",
      // additional_details : req.body.additional_details || "OOPS!!",
      // listing_video : req.body.listing_video || "OOPS!!",
      // map : req.body.map || "OOPS!!",
      // subscribe : req.body.subscribe || "OOPS!!",
      // weekly_offer : req.body.weekly_offer || "OOPS!!",
      // footer_social : req.body.footer_social || "OOPS!!",
      // footer_about : req.body.footer_about || "OOPS!!",
      // useful_links : req.body.useful_links || "OOPS!!",
      // footer_col_title : req.body.footer_col_title || "OOPS!!",
      // contact_info : req.body.contact_info || "OOPS!!",
      // notes : req.body.notes || "OOPS!!",
      // dbtest : req.body.dbtest || "OOPS!!",
      // content: req.body.content || "OOPS!!"
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
exports.delete = (req, res) => { // Delete a note with the specified noteId in the request
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
