var app = require('express')();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = 8090;

server.listen(port);
console.log('se conecte na: http://localhost:' + port);

//Public web
app.get('/', function (req, res) {
  res.sendfile(path.join(__dirname, '/index.html'));
});
app.get('/css/*', function(req, res){
  res.sendfile(path.join(__dirname, '/css/', req.params[0]));
});
app.get('/js/*', function(req, res){
  res.sendfile(path.join(__dirname, '/js/', req.params[0]));
});
app.get('/images/*', function(req, res){
  res.sendfile(path.join(__dirname, '/images/', req.params[0]));
});
app.get('/sounds/*', function(req, res){
  res.sendfile(path.join(__dirname, '/sounds/', req.params[0]));
});

//Sockets
io.sockets.on('connection', function (socket) {
    socket.on('message', function (msg) {
        socket.broadcast.emit('message', msg);
    });
});
