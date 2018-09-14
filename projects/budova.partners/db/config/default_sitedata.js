var Sitedata = require('../models/sitedata.model.js');
var default_sitedata =  {
  project: new Sitedata({
    sitename: 'Budova.partners',
    logo: '/images/logo.png',
    phone: '093000',
    mail: 'mail.mail',
    address: 'adress',
    fb_link: 'fblink',
    insta_link: 'instalink',
    twitter_link: 'twitterlink',
  })
}
Sitedata.find({sitename: default_sitedata.project.sitename})
        .then(sites => {
            if (sites.length == 0) {
              default_sitedata.project.save(function(err, savedUser){
                if (err) {  console.log(err); }
              console.log('Default Site Info has been registered');
              })
            }
            else {
              console.log(default_sitedata.project.sitename + ':ok');
            }
        })
        .catch(err => {
            console.log('error occured while searching sitedata');
        });
module.exports = default_sitedata;
