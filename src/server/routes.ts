import * as express from 'express';
/**
 * Routes
 */
export class Routes {

    public index(req: express.Request, res: express.Response) {

        if(typeof req.session.user === 'string') {
            return res.redirect('dashboard');
        }
        return res.render('index');
    }

    public login(req: express.Request, res: express.Response) {
        
        if(req.method === 'GET') {
            return res.render('login');
        } else if(req.method === 'POST') {
            let body = req.body;
            console.log(body);
            if(body.email === 'test@test.com' && body.password === 'test') {
                req.session.user = body.email;
                if(body.remember === 'on') {
                    req.session.cookie.expires = new Date().getTime() + 3600000;
                }
                return res.redirect('dashboard');
            } else {
                return res.redirect('login');
            }
        }
    }

    public dashboard(req: express.Request, res: express.Response) {
        
        if(typeof req.session.user === 'string') {
            res.render('dashboard', {
                user: req.session.user
            });
        } else {
            return res.redirect('login');
        }
    }
}