"use strict";
const express = require('express');
const path = require('path');
const swig = require('swig');
const routes_1 = require('./routes');
class App {
    constructor() {
        this.app = express();
        this.routes();
        this.config();
    }
    config() {
        this.app.engine('html', swig.renderFile);
        this.app.set('view engine', 'html');
        this.app.set('views', path.join(__dirname + '/../views'));
        this.app.set('view cache', false);
        // To disable Swig's cache, do the following:
        swig.setDefaults({ cache: false });
        this.app.use(express.static(path.join(__dirname, '/../assets')));
    }
    routes() {
        let router;
        let route;
        router = express.Router();
        route = new routes_1.Routes();
        router.get('/', route.index.bind(route.index));
        router.get('/login', route.login.bind(route.login));
        router.post('/login', route.login.bind(route.login));
        router.get('/dashboard', route.dashboard.bind(route.dashboard));
        this.app.use(router);
    }
}
var app = new App();
module.exports = app.app;
