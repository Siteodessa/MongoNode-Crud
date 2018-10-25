const io = require('socket.io')();

io.on('connection', (client) => {
        client.on('subscribeToTimer', (interval) => {
            console.log('client is connecting to chat');
            setInterval(() => {
            client.emit('timer', new Date().toLocaleString("ru"));
            }, interval);
        });
        client.on('chat message', function(msg){
          client.emit('chat message', msg);
        });
});
const port = 8000;
io.listen(port);
console.log('listening on port ', port);
