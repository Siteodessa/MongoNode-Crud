module.exports = (cf)=>{
console.log('admin routes...');
var session  = require('express-session');
var fs  = require('fs');
let app = cf.app;
let express = cf.express;
let User = cf.user;
let json_Result = cf.json_Result;
let is_LoggedIn = cf.is_LoggedIn;
let redirect_to_login = cf.redirect_to_login;

app.use(session({secret:"f254fr45t43ty5409143t91y4ty920ty123", resave:false, saveUninitialized:true}))
app.use(express.static('views'));
app.use(express.static('./public'));

    const image_routes = require('./image.routes')(app, is_LoggedIn, redirect_to_login);
    const auth_routes = require('./auth.routes')(app, is_LoggedIn, redirect_to_login, cf);
    const admin_pages_routes = require('./admin.pages.routes')(app, is_LoggedIn, redirect_to_login, cf);
    const admin_api_routes = require('./admin.api.routes')(cf);
};
