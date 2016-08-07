import * as express from 'express';
import * as path from 'path';
import * as swig from 'swig';
import {Routes} from './routes';
import * as Session from 'express-session';
import * as bodyParser from 'body-parser';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.templates();
    }

    public config() {
        // Request parsers and url parsers
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // Delete cahe
        this.app.use(function(req, res, next) {
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            next();
        });

        // Activate Sessions
        this.app.use(Session({
            name: '__semisingleapp',
            secret: 'keyboard cat'
        }));
    }

    public templates() {
        // Swig template engine configs
        this.app.engine('html', swig.renderFile);
        this.app.set('view engine', 'html');
        this.app.set('views', path.join(__dirname + '/../../views'));
        this.app.set('view cache', false);
        // To disable Swig's cache, do the following:
        swig.setDefaults({ cache: false });

        // Load static files
        this.app.use(express.static(path.join(__dirname, '/../../assets')));
        this.app.use(express.static(path.join(__dirname, '/../../src/client/')));
    }

    public routes() {
        let router: express.Router;
        let route: Routes;
        router = express.Router();
        route = new Routes();

        // Landing page
        router.get('/', route.index.bind(route.index));

        // Login routes
        router.get('/login', route.login.bind(route.login));
        router.post('/login', route.login.bind(route.login));

        // Dashboard page
        router.get('/dashboard', route.dashboard.bind(route.dashboard));

        this.app.use(router);
    }
}

var app = new App();
export = app.app;