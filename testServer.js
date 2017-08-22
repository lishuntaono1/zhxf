var net = require('net');
var fs = require('fs')
var server = net.createServer();
var port = 4005;
server.on('connection', function (socket) {
  console.log('got a new connection',socket.address());
  socket.on('data', function (data) {
    console.log('got data:', data.length, data.toString());
    fs.appendFile('message.txt', data, (err) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('The data  was appended to file! len',data.byteLength);
      }
    });

  });
  socket.on('close', function () {
    console.log('connection closed',socket.address());
  });
});
server.on('error', function (err) {
  console.log('Server error:', err.message);
});
server.on('close', function () {
  console.log('Server closed');
});

server.listen(port, function (err) {
  if (!err) {
    console.log('listen on :', server.address());
  } else {
    console.log('')
  }
});