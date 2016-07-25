import * as express from 'express';
import path = require('path');
import swig = require('swig');
import {Routes} from './routes';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.routes();
        this.config();
    }

    public config() {
        this.app.engine('html', swig.renderFile);
        this.app.set('view engine', 'html');
        this.app.set('views', path.join(__dirname + '/../views'));

        this.app.set('view cache', false);
        // To disable Swig's cache, do the following:
        swig.setDefaults({ cache: false });
        this.app.use(express.static(path.join(__dirname, '/../assets')));
    }

    public routes() {
        let router: express.Router;
        let route: Routes;
        router = express.Router();
        route = new Routes();

        router.get('/', route.index.bind(route.index));
        router.get('/login', route.login.bind(route.login));
        router.post('/login', route.login.bind(route.login));
        router.get('/dashboard', route.dashboard.bind(route.dashboard));

        this.app.use(router);
    }
}

var app = new App();
export = app.app;