import * as express from 'express';
/**
 * Routes
 */
export class Routes {

    public index(req: express.Request, res: express.Response) {
        res.render('index');
    }

    public login(req: express.Request, res: express.Response) {
        if(req.method === 'GET') {
            res.render('login');
        } else if(req.method === 'POST') {
            res.redirect('dashboard');
        }
    }

    public dashboard(req: express.Request, res: express.Response) {
        res.render('dashboard');
    }
}