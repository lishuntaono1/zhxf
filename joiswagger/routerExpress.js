import {
  toSwaggerDoc,
  ui,
  mixedValidate
} from './src'

import express from 'express'
import path from 'path'
import swaggerV2UIHtml from './src/ui-html'
import swaggerV3UIHtml from './src/ui-html-v3'
const swaggerV2Path = path.dirname(require.resolve('swagger-ui/package.json')) + '/dist'
const swaggerV3Path = path.dirname(require.resolve('swagger-ui-dist/package.json'))
export const debug = require('debug')('joi-swagger:expressRouter')
//mix swagger like config demo
import mixedDoc from './test/fixtures/mixed-doc'



const router = express.Router();
//默认挂载点
let pathRoot = '/swagger';
let pathPrefix = '/swagger';

//默认使用swagger v3
let version = 'v3';
let UIAssetsPath = swaggerV2Path;
//let UIHtml = swaggerV3UIHtml  ;//(document, pathPrefix, swaggerConfig)


let document = null;

router.get('/', function (req, res, next) {
  try {
    let html = '';
    if (req.query.version === 'v2') {
      version = 'v2';
      html = swaggerV2UIHtml(document, pathRoot);
    } else {
      version = 'v3';
      html = swaggerV3UIHtml(document, pathRoot, `{configUrl:'${pathPrefix}/api-docs'}`);
    }
    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (ex) {
    console.log("Exception:", ex, req);
  }
})

router.get('/api-docs(.json)?', function (req, res, next) {
  try {
    res.set('Content-Type', 'text/json');
    res.send(document);
  } catch (ex) {
    console.log("Exception:", ex, req);
  }
})

router.get('/swagger-config', function (req, res, next) {
  try {
    res.set('Content-Type', 'text/json');
    res.send({
      url: pathPrefix + '/api-docs'
    })
  } catch (ex) {
    console.log("Exception:", ex, req);
  }
})

router.get('/*', function (req, res, next) {
  try {
    let UIAssetsPath = swaggerV3Path;
    if (version === 'v2')
      UIAssetsPath = swaggerV2Path;
    const filePath = req.path; //.substring(pathRoot.length);
    console.log('Send File:', version,filePath, UIAssetsPath);
    res.sendFile(filePath, {
        root: UIAssetsPath,
        maxage: 3600 * 1000 * 24 * 30
      },
      function (err) {
        if (err) {
          console.log(err);
          console.log('Send File Error: to next()', filePath, UIAssetsPath);
          //res.status(err.status).end();
          next();
        } else {

        }
      });

  } catch (ex) {
    console.log("Exception:", ex, req);
   // next();
  }
})


/** 
 * Swagger 's router for Express 4 
 * @param {Express} app
 * @param {Module}  swgMix
 * @param {String}  uriMount  where the swagger url start `${uriMount}/
 * @return 
 */
export default (app, swgMix = mixedDoc, uriMount = '/swagger') => {
  pathRoot = uriMount;
  pathPrefix = pathRoot.endsWith('/') ? pathRoot.substring(0, pathRoot.length - 1) : pathRoot
  document = toSwaggerDoc(swgMix);
  debug('to accses swagger doc uri:'+ uriMount);
  app.use(uriMount, router);
}