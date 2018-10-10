const Quest = require('../db/models/quest.model.js');
const Reviews_m = require('../db/models/reviews.model');
exports.create = (req, res) => {
    const quest = new Quest({    // Create a Quest


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

    quest.save()    // Save Quest in the database
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


exports.findAll = (req, res) => { // Retrieve and return all quests from the database.
    Quest.find()
    .then(quests => {
        res.status(200).send(quests);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving quests."
        });
    });
};



function update_counter(model, elem) {
  elem.counter++
  model.findByIdAndUpdate(elem.id,
  {counter:elem.counter}, {new: true})
  .then(elem => { console.log(elem.title + ' was visited ' + elem.counter + ' times'); }) .catch(err => { console.log(err); })
}

function render_page(res, elem, elements) {

  console.log(elem.page_link);

   res.render('./quests_single.ejs', {d: elem,reviews: elements})
}



exports.single_page = (req, res, quests_m) => {
      Quest.find().then(quests => {
        quests.forEach(elem => {
          if (elem.page_link == req.params.page_link) {
              Reviews_m.find().then(elements => {
                     update_counter(Quest, elem);
                     render_page(res, elem, elements)
                  }).catch(err => { console.log(err); });
          }
        });
      }).catch(err => {console.log(err); });
};



exports.findOne = (req, res) => {// Find a single quest with a questId
    Quest.findById(req.params.questId)
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
    Quest.findByIdAndUpdate(req.params.questId, the_data, {new: true})
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
    Quest.findByIdAndUpdate(req.params.questId, {
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
    Quest.findByIdAndRemove(req.params.questId)
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
