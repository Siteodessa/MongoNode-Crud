const mongoose = require('mongoose');

const SiteDataSchema = mongoose.Schema
({
    sitename:  { type: String, minlength: [4, 'Short sitename'],maxlength: [100, 'Long sitename'], default:'Sitename not set', unique: true},
    logo:  { type: String, minlength: [4, 'Short logo'], maxlength: [100, 'Long logo'], default:'logo not set'},
    phone:  { type: String, minlength: [4, 'Short phone'],maxlength: [100, 'Long phone'], default:'phone not set'},
    mail:  { type: String, minlength: [4, 'Short mail'],maxlength: [100, 'Long mail'], default:'mail not set'},
    address:  { type: String, minlength: [4, 'Short address'],maxlength: [100, 'Long address'], default:'address not set'},
    fb_link:  { type: String, minlength: [4, 'Short fb_link'],maxlength: [100, 'Long fb_link'], default:'facebook_link not set'},
    insta_link:  { type: String, minlength: [4, 'Short insta_link'],maxlength: [100, 'Long insta_link'], default:'instagram link not set'},
    twitter_link:  { type: String, minlength: [4, 'Short twitter_link'],maxlength: [100, 'Long twitter_link'], default:'twitter link not set'},

}, {
    timestamps: true
});

module.exports = mongoose.model('SiteData', SiteDataSchema);
