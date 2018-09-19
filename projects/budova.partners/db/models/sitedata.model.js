const mongoose = require('mongoose');

const SiteDataSchema = mongoose.Schema
({
    sitename:  { type: String, minlength: [4, 'Short sitename'],maxlength: [100, 'Long sitename'], default:'Sitename not set', unique: true, ru_label: 'Имя сайта',  input_type: 'text'},
    logo:  { type: String, minlength: [4, 'Short logo'], maxlength: [100, 'Long logo'], default:'logo not set', ru_label: 'Лого',  input_type: 'single_image'},
    phone:  { type: String, minlength: [4, 'Short phone'],maxlength: [100, 'Long phone'], default:'phone not set', ru_label: 'Телефон',  input_type: 'phone'},
    mail:  { type: String, minlength: [4, 'Short mail'],maxlength: [100, 'Long mail'], default:'mail not set', ru_label: 'Почта',  input_type: 'email'},
    address:  { type: String, minlength: [4, 'Short address'],maxlength: [100, 'Long address'], default:'address not set', ru_label: 'Адрес',  input_type: 'address'},
    fb_link:  { type: String, minlength: [4, 'Short fb_link'],maxlength: [100, 'Long fb_link'], default:'facebook_link not set', ru_label: 'Ссылка на Facebook',  input_type: 'link'},
    insta_link:  { type: String, minlength: [4, 'Short insta_link'],maxlength: [100, 'Long insta_link'], default:'instagram link not set', ru_label: 'Ссылка на Instagram',  input_type: 'link'},
    twitter_link:  { type: String, minlength: [4, 'Short twitter_link'],maxlength: [100, 'Long twitter_link'], default:'twitter link not set', ru_label: 'Ссылка на Twitter',  input_type: 'link'},

}, {
    timestamps: true
});

module.exports = mongoose.model('SiteData', SiteDataSchema);
