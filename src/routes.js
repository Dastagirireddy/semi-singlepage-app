"use strict";
/**
 * Routes
 */
class Routes {
    index(req, res) {
        if (typeof req.session.user === 'string') {
            return res.redirect('dashboard');
        }
        return res.render('index');
    }
    login(req, res) {
        if (req.method === 'GET') {
            return res.render('login');
        }
        else if (req.method === 'POST') {
            let body = req.body;
            console.log(body);
            if (body.email === 'test@test.com' && body.password === 'test') {
                req.session.user = body.email;
                if (body.remember === 'on') {
                    req.session.cookie.expires = new Date().getTime() + 3600000;
                }
                return res.redirect('dashboard');
            }
            else {
                return res.redirect('login');
            }
        }
    }
    dashboard(req, res) {
        if (typeof req.session.user === 'string') {
            res.render('dashboard', {
                user: req.session.user
            });
        }
        else {
            return res.redirect('login');
        }
    }
}
exports.Routes = Routes;
