//replace brone with new "note" name
function formatDate(timestamp) {
  date = new Date(timestamp);
var dd = date.getDate();
if (dd < 10) dd = '0' + dd;

var mm = date.getMonth() + 1;
if (mm < 10) mm = '0' + mm;

var yy = date.getFullYear() % 100;
if (yy < 10) yy = '0' + yy;

var hh = date.getHours();
var min = date.getMinutes();

return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + min;
}


function check_empty(brone) {
    if (brone == '' || brone === '') {
      let err = {}
       err.mesage = 'empty field'
      throw err
    }
}
function check_brone(brone) {

        check_empty(brone[timestamp])
        check_empty(brone[brone_time])
        check_empty(brone[name])
        check_empty(brone[phone])
        check_empty(brone[price])
        check_empty(brone[quantity])
        check_empty(brone[time])


}

const Model = require('../db/models/brone.model.js');
exports.create = (req, res) => {
    timestamp = new Date(req.body.brone_time).getTime()
    console.log(timestamp);
      // EXTRACT SCHEMA ,MAKE LOOP THROUGH IT AND SAVE THE CORRESPONDING FIELD YOPTA
    const brone = new Model({
        timestamp: timestamp || "",
        brone_time: req.body.brone_time || "",
        name: req.body.name || "",
        phone: req.body.name || "",
        price: req.body.price || "",
        quantity: req.body.quantity || "",
        time: req.body.time || "",
        quest_name: req.body.quest_name || "aaa",
        company_name: req.body.company_name || "aaa"
    });

    brone.save()
    .then(data => {
      res.status(200).send(data);
    }).catch(err => {
                console.log(err);
        res.status(500).send({

            message: err.message || "Some error occurred while creating the Model."

        });
    });
};

exports.findAll = (req, res) => {
    Model.find()
    .then(brones => {
        res.status(200).send(brones);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving brones."
        });
    });
};



exports.findOne = (req, res) => {
    Model.findById(req.params.broneId)
    .then(brone => {
        if(!brone) {
            return res.status(404).send({
                message: "Model not found with id " + req.params.broneId
            });
        }
        res.send(brone);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Model not found with id " + req.params.broneId
            });
        }
        return res.status(500).send({
            message: "Error retrieving brone with id " + req.params.broneId
        });
    });
};
exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Model content can not be empty"
        });
    }
    Model.findByIdAndUpdate(req.params.broneId, {
      // title: req.body.title || "Budova.partners",

    }, {new: true})
    .then(brone => {
        if(!brone) {
            return res.status(404).send({

                message: "Model not found with id " + req.params.broneId
            });
        }
        res.status(200).send(brone);
    }).catch(err => {
        if(err.kind === 'ObjectId') {

            return res.status(404).send({
                message: "Model not found with id " + req.params.broneId
            });
        }

        return res.status(500).send({
            message: "Error updating brone with id " + req.params.broneId
        });
    });
};
exports.delete = (req, res) => {
    Model.findByIdAndRemove(req.params.broneId)
    .then(brone => {
        if(!brone) {
            return res.status(404).send({
                message: "Model not found with id " + req.params.broneId
            });
        }
        res.status(200).send({message: "Model deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Model not found with id " + req.params.broneId
            });
        }
        return res.status(500).send({
            message: "Could not delete brone with id " + req.params.broneId
        });
    });
};
