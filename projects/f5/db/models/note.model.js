const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema
({
    title: String,
    home_title: String,
    home_background : String,
    breadcrumbs : Array,
    main_nav_list : String,
    phone : String,
    logo : String,
    listing_title : String,
    listing_text : String,
    room_tags : String,
    listing_price_col : String,
    listing_slider : String,
    listing_details : String,
    description : String,
    additional_details : String,
    additional_details_block : String,
    listing_video : String,
    map_heading : String,
    map_iframe : String,
    subscribe : String,
    weekly_offer : String,
    footer_social : String,
    footer_about : String,
    useful_links : String,
    footer_col_title : String,
    contact_info : String,
    notes : String,
    dbtest : String,
    content: String,
    listing_details_iconblock: Array,
    useful_links_menu_list: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);
