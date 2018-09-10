var Sitedata = require('../models/sitedata.model.js');
var default_sitedata =  {
  lama: new Sitedata({
    sitename: 'Budova.partners',
    logo: 'img',
    phone: '093000',
    mail: 'mail.mail',
    address: 'adress',
    fb_link: 'fblink',
    insta_link: 'instalink',
    twitter_link: 'twitterlink',
  })
}
var registerSiteData = require('../../controllers/sitedata.controller.js');
for (let data in default_sitedata) {
  registerSiteData(data, default_sitedata[data])
  }
module.exports = default_sitedata;
