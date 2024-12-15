import { Router, Request, Response } from 'express';

export default class UserRoute {
    constructor(private mainRouter: Router) {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.mainRouter.get('/user', (req: Request, res: Response) => {
            res.send('List of users');
        });

        this.mainRouter.post('/user', (req: Request, res: Response) => {
            res.send('Create a new user');
        });
    }
}
