import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import { env } from './config'; //config
import helmet from 'helmet';
import multer from 'multer';
import routes from './routes';
import authenticationConfig from './authentication-config';
const app = express();
const SixMonths = 15778476000;

function initMiddlewareAndExpressConfigs(app) {
    // Showing stack errors
    app.set('showStackError', true);
    app.set("view engine", "ejs");
    app.set("views", "../app/views")
    app.use(express.static(__dirname + '/public'))

    // Enable jsonp
    app.enable('jsonp callback');
    if (env === 'development' || env === 'test') {
        // Enable logger (morgan)
        app.use(morgan('dev'));
        app.use(compression())
            // Disable views cache
        app.set('view cache', false);
    } else if (env === 'production') {
        app.locals.cache = 'memory';
    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
}

function initHelmetHeaders(app) {
    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff())
    app.use(helmet.ieNoOpen());
    app.use(helmet.hsts({
        "maxAge": SixMonths,
        "includeSubdomains": true,
        "force": true
    }));
    app.disable("x-powered-by");
}

function initCrossDomain(app) {
    app.use(cors());
    app.use(function(req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token');
        next();
    });
}

function initConfigAuthentication(app) {
    authenticationConfig(app);
}

function initRoutes(app) {
    app.use('/api', routes);
}

export default () => {
    const app = express();
    initMiddlewareAndExpressConfigs(app);
    initHelmetHeaders(app);
    initCrossDomain(app);
    initConfigAuthentication(app);
    initRoutes(app);
    return app
}