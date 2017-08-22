import path from 'path'
import {
  debug
} from './utils'
import swaggerV2UIHtml from './ui-html'
import swaggerV3UIHtml from './ui-html-v3'
const swaggerV2Path = path.dirname(require.resolve('swagger-ui/package.json')) + '/dist'
const swaggerV3Path = path.dirname(require.resolve('swagger-ui-dist/package.json'))
debug('swaggerV3Path', swaggerV3Path)
export default function (
  document, {
    pathRoot = '/swagger',
    skipPaths = [],
    UIHtml = swaggerV2UIHtml,
    UIAssetsPath = swaggerV2Path,
    swaggerConfig = '{}',
    sendConfig = {
      maxage: 3600 * 1000 * 24 * 30
    },
    v3 = false,
  } = {}
) {
  if (v3) {
    if (UIHtml === swaggerV2UIHtml) {
      UIHtml = swaggerV3UIHtml
    }
    if (UIAssetsPath === swaggerV2Path) {
      UIAssetsPath = swaggerV3Path
    }
  }
  const pathPrefix = pathRoot.endsWith('/') ? pathRoot.substring(0, pathRoot.length - 1) : pathRoot
  const html = UIHtml(document, pathPrefix, swaggerConfig)

  //express 
  return async(req, res, next) => {
    console.log("swagger req.path", req.path);
    //const skipPath = skipPaths.some((path) => req.path.startsWith(path))
    const skipPath = false;
    try {
      if (req.path.startsWith(pathRoot)) {
        if (req.path === pathRoot  || req.path === pathPrefix) {
          res.set('Content-Type', 'text/html');
          res.send(html);

        } else if (req.path.replace(/\.json$/, '') === (pathPrefix + '/api-docs')) {
          res.set('Content-Type', 'text/json');
          res.send(document);
        } else if (req.path === pathPrefix + '/swagger-config') {
          console.log('get swagger-config');
          res.set('Content-Type', 'text/json');
          res.send({
            url: req.origin + '/swagger/api-docs'
          })
        } else if (!skipPath &&
          req.path.startsWith(pathRoot + '/')
        ) {
          const filePath = req.path.substring(pathRoot.length);
          res.sendFile(filePath, {
              root: UIAssetsPath,
              ...sendConfig
            },
            function (err) {
              if (err) {
                console.log(err);
                res.status(err.status).end();
              } else {
                console.log('Sent:', filePath);
              }
            });
          console.log({
            UIAssetsPath,
            filePath
          });


        }
      }
      return;
    } catch (err) {
      console.log('swagger error', err)
      res.send({
        status: 0,
        message: err
      })
      return;
    }
    return next()
  }
}