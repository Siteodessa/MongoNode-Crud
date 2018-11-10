const Quest_m = require('../db/models/quest.model.js');
const Reviews_m = require('../db/models/reviews.model');
const Brone_m = require('../db/models/brone.model');
const Single_page_c = require('./single_page.controller');
exports.single_page = Single_page_c.single_page


exports.create = (req, res) => {
    const quest = new Quest_m({
      title: req.body.title || "",
      main_image: req.body.title || "",
      home_title: req.body.home_title || "",
      company_name: req.body.company_name || "",
      min_players: req.body.min_players || "",
      max_players: req.body.max_players || "",
      price: req.body.price || "",
      complexity: req.body.complexity || "",
      fear_level: req.body.fear_level || "",
      age: req.body.age || "",
      description: req.body.description || "",
    });
    quest.save()
    .then(data => {
        console.log('da');
        console.log(data);
    res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the Quest."
      });
    });
};


exports.findAll = (req, res) => {
    Quest_m.find()
    .then(quests => {
        res.status(200).send(quests);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving quests."
        });
    });
};






exports.findOne = (req, res) => {
    Quest_m.findById(req.params.questId)
    .then(quest => {
        if(!quest) {
            return res.status(404).send({
                message: "Quest not found with id " + req.params.questId
            });
        }
        res.send(quest);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Quest not found with id " + req.params.questId
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
    Quest_m.findByIdAndUpdate(req.params.questId, the_data, {new: true})
    .then(quest => {
        if(!quest) {
            return res.status(404).send({
                message: "Quest not found with id " + req.params.questId
            });
        }
        res.status(200).send(the_data);
        for (var member in myObject) delete myObject[member];
    }).catch(err => {
        if(err.kind === 'ObjectId') {

            return res.status(404).send({
                message: "Quest not found with id " + req.params.questId
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
            message: "Quest content can not be empty"
        });
    }
    Quest_m.findByIdAndUpdate(req.params.questId, {
      // title: req.body.title || "Budova.partners",
    }, {new: true})
    .then(quest => {
        if(!quest) {
            return res.status(404).send({

                message: "Quest not found with id " + req.params.questId
            });
        }
        res.status(200).send(quest);
    }).catch(err => {
        if(err.kind === 'ObjectId') {

            return res.status(404).send({
                message: "Quest not found with id " + req.params.questId
            });
        }

        return res.status(500).send({
            message: "Error updating quest with id " + req.params.questId
        });
    });
};
exports.delete = (req, res) => {
    Quest_m.findByIdAndRemove(req.params.questId)
    .then(quest => {
        if(!quest) {
            return res.status(404).send({
                message: "Quest not found with id " + req.params.questId
            });
        }
        res.status(200).send({message: "Quest deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Quest not found with id " + req.params.questId
            });
        }
        return res.status(500).send({
            message: "Could not delete quest with id " + req.params.questId
        });
    });
};
