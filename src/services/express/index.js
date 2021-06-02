import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import multer from 'multer';
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../../config'

export default (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }

  const storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
      // cb(null, './uploads/')
      cb(null, process.env.PWD + '/uploads');
    },
    filename: function(req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
  });

  const upload = multer({ //multer settings
    storage: storage,
    // fileFilter: function(req, file, callback) { //file filter      
    //     callback(null, true);
    // }
  });

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())
  app.use(express.json({limit: '50mb', extended: true}));
  app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));

  return app
}
