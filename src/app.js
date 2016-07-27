"use strict";
const express = require('express');
const path = require('path');
const swig = require('swig');
const routes_1 = require('./routes');
const Session = require('express-session');
const bodyParser = require('body-parser');
class App {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.templates();
    }
    config() {
        // Request parsers and url parsers
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        // Delete cahe
        this.app.use(function (req, res, next) {
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            next();
        });
        // Activate Sessions
        this.app.use(Session({
            name: '__semisingleapp',
            secret: 'keyboard cat'
        }));
    }
    templates() {
        // Swig template engine configs
        this.app.engine('html', swig.renderFile);
        this.app.set('view engine', 'html');
        this.app.set('views', path.join(__dirname + '/../views'));
        this.app.set('view cache', false);
        // To disable Swig's cache, do the following:
        swig.setDefaults({ cache: false });
        // Load static files
        this.app.use(express.static(path.join(__dirname, '/../assets')));
    }
    routes() {
        let router;
        let route;
        router = express.Router();
        route = new routes_1.Routes();
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
module.exports = app.app;
