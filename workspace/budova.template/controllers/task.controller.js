const Task = require('../db/models/task.model');
const Reviews_m = require('../db/models/review.model');
exports.create = (req, res) => {
console.log('MAN WATAFAk');
  console.log(req.body.task);
    const task = new Task({    // Create a Task


        task: req.body.task || "Не охренеть и ",
        task_desc: req.body.task_desc || "Допилить это",
        task_status: req.body.task_status || "Срочное",

    });

    task.save()    // Save Task in the database
    .then(data => {
      res.set({
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Methods': 'POST, GET',
        'Access-Control-Allow-Headers': 'Origin,X-Requested-With,content-type',
        'Access-Control-Allow-Origin': '*'
      }).status(200).send(JSON.stringify(data));
    }).catch(err => {
      console.log(err);
        res.set({
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Methods': 'POST, GET',
          'Access-Control-Allow-Headers': 'Origin,X-Requested-With,content-type',
          'Access-Control-Allow-Origin': '*'
        }).status(500).send({
            message: err.message || "Some error occurred while creating the Task."

        });
    });
};


exports.findAll = (req, res) => { // Retrieve and return all tasks from the database.
    Task.find()
    .then(tasks => {
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
      res.status(200).send(JSON.stringify(tasks));
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tasks."
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

   res.render('./tasks_single.ejs', {d: elem,reviews: elements})
}



exports.single_page = (req, res, tasks_m) => {
      Task.find().then(tasks => {
        tasks.forEach(elem => {
          if (elem.page_link == req.params.page_link) {
              Reviews_m.find().then(elements => {
                     update_counter(Task, elem);
                     render_page(res, elem, elements)
                  }).catch(err => { console.log(err); });
          }
        });
      }).catch(err => {console.log(err); });
};



exports.findOne = (req, res) => {// Find a single task with a taskId
    Task.findById(req.params.taskId)
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        res.send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Error retrieving task with id " + req.params.taskId
        });
    });
};
exports.custom_update = (req, res) => {

var the_data = '';
for (let prop in req.body) {

  if (!JSON.parse(req.body[prop])){console.error('ERO');}
  the_data = JSON.parse(prop)
}
delete the_data["taskId"];
    Task.findByIdAndUpdate(req.params.taskId, the_data, {new: true})
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        res.status(200).send(the_data);
        for (var member in myObject) delete myObject[member];
    }).catch(err => {
        if(err.kind === 'ObjectId') {

            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }

        return res.status(500).send({
            message: "Error updating task with id " + req.params.taskId
        });
    });
};


exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Task content can not be empty"
        });
    }
    Task.findByIdAndUpdate(req.params.taskId, {
      // title: req.body.title || "Budova.partners",

    }, {new: true})
    .then(task => {
        if(!task) {
            return res.status(404).send({

                message: "Task not found with id " + req.params.taskId
            });
        }
        res.status(200).send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {

            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }

        return res.status(500).send({
            message: "Error updating task with id " + req.params.taskId
        });
    });
};
exports.delete = (req, res) => {
    Task.findByIdAndRemove(req.params.taskId)
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        res.status(200).send({message: "Task deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Could not delete task with id " + req.params.taskId
        });
    });
};
