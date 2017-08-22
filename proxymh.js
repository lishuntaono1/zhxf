require('babel-core/register');
var http = require('http'),
  connect = require('connect'),
  harmon = require('harmon');
httpProxy = require('http-proxy');
//
// Create your proxy server and set the target in the options.
//

//httpProxy.createProxyServer({target:'http://gz.menhey.com'}).listen(8000); // See (†)







function filterBanqan(node) {
  //Create a read/write stream wit the outer option
  //so we get the full tag and we can replace it
  var stm = node.createStream({
    "outer": true
  });

  //variable to hold all the info from the data events
  var tag = '';

  //collect all the data in the stream
  stm.on('data', function(data) {
    tag += data;
  });

  //When the read side of the stream has ended..
  stm.on('end', function() {

    //Print out the tag you can also parse it or regex if you want
    console.log('filterBanqan tag:   ' ,tag );
    console.log('filterBanqan end:   ',node.name);

    //Now on the write side of the stream write some data using .end()
    //N.B. if end isn't called it will just hang.
    //fgstm.end('<img id="logo" src="http://i.imgur.com/LKShxfc.gif" alt="node.js"/>');
      if(tag.indexOf('门海')>0)
          stm.end('<div class="l-copyright">+ 格物智能</div>');
      else{
          stm.end(tag)
          console.log('not filterBanqan',tag);
      };





  });
  //  node.createWriteStream().end('<div>+ Trumpet</div>');
}





//
// Basic Connect App
//
var app = connect();
var port = 11000;
var proxyTarget = 'http://gz.menhey.com';
//var proxyTarget = 'http://localhost:9000';

var proxy = httpProxy.createProxyServer({
  target: proxyTarget
})

//Additional true parameter can be used to ignore js and css files.
//app.use(require('../')([], selects, true));

//
// Listen for the `error` event on `proxy`.
proxy.on('error', function (err, req, res) {
   console.log('error:',err,req.originalUrl);
});

//
// Listen for the `proxyRes` event on `proxy`.
//
proxy.on('proxyRes', function (proxyRes, req, res) {
  console.log("proxy end:",req.originalUrl);
});

selects = [
  {
    query: '.l-copyright',
    func: filterBanqan
  },
  {
      query: '.center_5',
      func: filterBanqan
    },
    {
        query: '.copyrightl',
        func: filterBanqan
      },


];
//selects = [];
app.use(harmon([], selects));

app.use(function(req, res) {
  console.log('proxy begin:',req.originalUrl);
  proxy.web(req, res);
});

http.createServer(app).listen(port);
console.log("listen on: ", port, " proxy target to: ", proxyTarget);

/*
        http.createServer(function (req, res) {
             res.writeHead(200, { 'Content-Type': 'text/html' });
               res.write('<html><head></head><body><div class="a">Nodejitsu Http Proxy</div><div class="b">&amp; Frames</div></body></html>');
                 res.end();
        }).listen(9000);
        */
