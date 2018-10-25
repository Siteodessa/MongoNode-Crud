var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;



function logObject(object){
  Object.keys(object).map(function(objectKey, index) {
      var value = object[objectKey];
      console.log(objectKey + ' =>' + value);
  });
}



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

    msg = ('Новый посетитель: id = '+ socket.id);
    msg1 = (new Date().toLocaleString("ru"));
        io.emit('chat message', msg1);
        io.emit('chat message', msg);
logObject(socket);


  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
