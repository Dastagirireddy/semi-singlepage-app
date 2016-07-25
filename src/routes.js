"use strict";
/**
 * Routes
 */
class Routes {
    index(req, res) {
        res.render('index');
    }
    login(req, res) {
        if (req.method === 'GET') {
            res.render('login');
        }
        else if (req.method === 'POST') {
            res.redirect('dashboard');
        }
    }
    dashboard(req, res) {
        res.render('dashboard');
    }
}
exports.Routes = Routes;
