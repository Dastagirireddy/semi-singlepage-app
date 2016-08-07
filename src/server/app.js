"use strict";
var express = require('express');
var path = require('path');
var swig = require('swig');
var routes_1 = require('./routes');
var Session = require('express-session');
var bodyParser = require('body-parser');
var App = (function () {
    function App() {
        this.app = express();
        this.config();
        this.routes();
        this.templates();
    }
    App.prototype.config = function () {
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
    };
    App.prototype.templates = function () {
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
    };
    App.prototype.routes = function () {
        var router;
        var route;
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
    };
    return App;
}());
var app = new App();
module.exports = app.app;
