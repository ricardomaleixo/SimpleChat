var fs = require('fs')
    , http = require('http')
    , socketio = require('socket.io')
    , port = 8090;
 
var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(port, function() {
    console.log('se conecte na: http://localhost:' + port);
});
 
socketio.listen(server).on('connection', function (socket) {
    socket.on('message', function (msg) {
        socket.broadcast.emit('message', msg);
    });
});
