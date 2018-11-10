function update_counter(model, elem) {
  elem.counter++
  model.findByIdAndUpdate(elem.id,
  {counter:elem.counter}, {new: true})
  .then(elem => { console.log(elem.title + ' was visited ' + elem.counter + ' times'); }) .catch(err => { console.log(err); })
}

function render_page(res, elem, reviews, brones, quests) {
   res.render('./pages/quests_single.ejs', {d: elem,reviews: reviews, brones: brones, quests:quests})
}

function equals(a, b) {
  if (a == b) {
    return true
  } return false
}
function strong_equals(a, b) {
  if (a === b) {
    return true
  } return false
}


function db_find() {

}

const Quest_m = require('../db/models/quest.model.js');
const Reviews_m = require('../db/models/reviews.model');
const Brone_m = require('../db/models/brone.model');



exports.single_page = (req, res, quests_m) => {


            Quest_m.find().then(quests => {
              Brone_m.find().then(brones => {
                Reviews_m.find().then(reviews => {
                  quests.forEach(elem => {
                    if (equals(elem.page_link, req.params.page_link)) {
                      update_counter(Quest_m, elem);
                      render_page(res, elem, reviews, brones, quests)
                    }
                  });
                })
              })
            }).catch(err => {console.log(err); });
};
