import {
  toSwaggerDoc,
  mixedValidate
} from './joiswagger/src'
import doc from './joiSwaggerDoc.js';
import express from 'express';
const app = express();


// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(async function (req, res, next) {
  const starts = Date.now()
  //console.log('Time:', ;
  await next();
  const ends = Date.now();
  console.log(req.method, req.originalUrl, 'cost time:', ends - starts);
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
// 一个中间件栈，对任何指向 /user/:id 的 HTTP 请求打印出相关信息nexti
//app.use next('route') 無效
app.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0){
    console.log('to next route')
    next('route');
  }else{
     console.log("to next middware");
     next(); //
  // 否则将控制权交给栈中下一个中间件
  }
}, function (req, res, next) {
  console.log('f2 Request Type:', req.method);
  next();
}, function (req, res, next) {
  console.log('send ends no next');
  res.send(`f3 ends not next called`);

});
// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.send(req.params);
});

const port = 2345
app.listen(2345, (err) => {
  console.log('listen on:', port);
});


let jdoc = toSwaggerDoc(doc);
//console.log(jdoc);