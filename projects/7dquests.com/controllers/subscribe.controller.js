const Subscribe_m = require('../db/models/subscribers.model');
exports.create = (req, res) => {
    const quest = new Subscribe_m({    // Create a Subscribe_m
        mail: req.body.mail || "",
    });

    quest.save()    // Save Subscribe_m in the database
    .then(data => {
          console.log('da');
          console.log(data);
      res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Subscribe_m."

        });
    });
};


exports.findAll = (req, res) => { // Retrieve and return all quests from the database.
    Subscribe_m.find()
    .then(quests => {
        res.status(200).send(quests);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving quests."
        });
    });
};




exports.findOne = (req, res) => {// Find a single quest with a questId
    Subscribe_m.findById(req.params.questId)
    .then(quest => {
        if(!quest) {
            return res.status(404).send({
                message: "Subscribe_m not found with id " + req.params.questId
            });
        }
        res.send(quest);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Subscribe_m not found with id " + req.params.questId
            });
        }
        return res.status(500).send({
            message: "Error retrieving quest with id " + req.params.questId
        });
    });
};
exports.custom_update = (req, res) => {

var the_data = '';
for (let prop in req.body) {

  if (!JSON.parse(req.body[prop])){console.error('ERO');}
  the_data = JSON.parse(prop)
}
delete the_data["questId"];
    Subscribe_m.findByIdAndUpdate(req.params.questId, the_data, {new: true})
    .then(quest => {
        if(!quest) {
            return res.status(404).send({
                message: "Subscribe_m not found with id " + req.params.questId
            });
        }
        res.status(200).send(the_data);
        for (var member in myObject) delete myObject[member];
    }).catch(err => {
        if(err.kind === 'ObjectId') {

            return res.status(404).send({
                message: "Subscribe_m not found with id " + req.params.questId
            });
        }

        return res.status(500).send({
            message: "Error updating quest with id " + req.params.questId
        });
    });
};


exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Subscribe_m content can not be empty"
        });
    }
    Subscribe_m.findByIdAndUpdate(req.params.questId, {
      // title: req.body.title || "Budova.partners",

    }, {new: true})
    .then(quest => {
        if(!quest) {
            return res.status(404).send({

                message: "Subscribe_m not found with id " + req.params.questId
            });
        }
        res.status(200).send(quest);
    }).catch(err => {
        if(err.kind === 'ObjectId') {

            return res.status(404).send({
                message: "Subscribe_m not found with id " + req.params.questId
            });
        }

        return res.status(500).send({
            message: "Error updating quest with id " + req.params.questId
        });
    });
};
exports.delete = (req, res) => {
    Subscribe_m.findByIdAndRemove(req.params.questId)
    .then(quest => {
        if(!quest) {
            return res.status(404).send({
                message: "Subscribe_m not found with id " + req.params.questId
            });
        }
        res.status(200).send({message: "Subscribe_m deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Subscribe_m not found with id " + req.params.questId
            });
        }
        return res.status(500).send({
            message: "Could not delete quest with id " + req.params.questId
        });
    });
};
