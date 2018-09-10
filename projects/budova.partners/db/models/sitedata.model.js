const mongoose = require('mongoose');

const SiteDataSchema = mongoose.Schema
({
    sitename:  { type: String, minlength: [4, 'Sitename'], default:'Sitename not set'},
    logo:  { type: String, minlength: [4, 'Sitename'], default:'logo not set'},
    phone:  { type: String, minlength: [4, 'Sitename'], default:'phone not set'},
    mail:  { type: String, minlength: [4, 'Sitename'], default:'mail not set'},
    address:  { type: String, minlength: [4, 'Sitename'], default:'address not set'},
    fb_link:  { type: String, minlength: [4, 'Sitename'], default:'facebook_link not set'},
    insta_link:  { type: String, minlength: [4, 'Sitename'], default:'instagram link not set'},
    twitter_link:  { type: String, minlength: [4, 'Sitename'], default:'twitter link not set'},

}, {
    timestamps: true
});

module.exports = mongoose.model('SiteData', SiteDataSchema);
