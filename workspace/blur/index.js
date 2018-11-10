var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var logObject = require('logObject');
var appGetter = require('appGetter');
var port = process.env.PORT || 80;
var dir = __dirname;
app.use("/public", express.static(dir + '/public'));






appGetter(app, 'login', 'login', dir)
appGetter(app, '', 'index', dir)



io.on('connection', function(socket){
      var localdate = new Date().toLocaleString("ru");
      msg = ('Новый посетитель: id = '+ socket.id + localdate);
      io.emit('chat message', msg);
      logObject(socket);
      socket.on('chat message', function(msg){
      io.emit('chat message', msg);
        });
});

http.listen(port, function(){ console.log('Port:' + port); });
