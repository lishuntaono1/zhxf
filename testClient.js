const net = require('net');
const sconfig = {
  //host: '101.200.42.28',
  host:'127.0.0.1',
  port: 4005
}

try {
  const client = net.createConnection(sconfig.port,sconfig.host, (err) => {
    //'connect' listener
    if (err) {
      console.log('connect to server error', err, sconfig);
      process.exit();
    }
    console.log('connected to server!', sconfig);
    client.write('world!\r\n');
  });
  client.on('data', (data) => {
    console.log(data.toString());
    client.end();
  });
  client.on('end', () => {
    console.log('disconnected from server');
  });
} catch (ex) {
  console.log('connect to server error', ex, sconfig);
  process.exit();

}