var d= {}
d._id = d.noteId = d.id = '5b59c5414b38dd34d80410bd'
d.title =
d.home_title =
d.home_background =
d.breadcrumbs =
d.main_nav_list =
d.phone =
d.logo =
d.listing_title =
d.listing_text =
d.room_tags =
d.listing_price_col =
d.listing_slider =
d.listing_details=
d.description=
d.content=
d.additional_details=
d.listing_video=
d.map_heading =
d.map_iframe =
d.subscribe =
d.weekly_offer =
d.footer_social =
d.footer_about =
d.useful_links =
d.footer_col_title =
d.contact_info =
d.useful_links_menu_list =
d.listing_details_iconblock = ''

const Note = require('../models/note.model.js');



function try_jsonparse(d, str_or_arr) {
  try {
  var d_field = JSON.parse("[" + d[str_or_arr] + "]");
      return d_field;

  return d_field1;
  } catch (err) {
    return d[str_or_arr];
  }
}
function type_n_log(additional_details) {
  console.log(additional_details);
  console.log(typeof(additional_details));
}

Note.find()
.then(notes => {
for (let prop in d) {
d[prop] = try_jsonparse(notes[0], prop)
}

// type_n_log(d.useful_links_menu_list)
module.exports = d;
}).catch(err => {
res.status(500).send({
message: err.message || "Some error occurred while retrieving notes."
});
});

//
// console.log('Switch all collective data to d.breadcrumbs');
// console.log(typeof(d.breadcrumbs));
module.exports = d;
