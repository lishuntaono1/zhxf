const dgram = require('dgram');
const fs = require('fs')
const server = dgram.createSocket('udp4');

var port = 4006;
server.on('error', (err) => {
  console.log(`服务器异常：\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`服务器收到：${msg} 来自 ${rinfo.address}:${rinfo.port}`);
  fs.appendFile('udp.message.txt', 'data to append', (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
});

server.on('listening', () => {
  const address = server.address();
  console.log(`服务器监听 ${address.address}:${address.port}`);
});

server.bind(port);