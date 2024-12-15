import { Router, Request, Response } from 'express';
import userRoute from './userRoute';
import categoryRoute from './categoryRoute';

export default class Route {
    private router : Router = Router();

    constructor() {
        this.initRoute();
    }

    private initRoute() {
        this.router.use('/user', userRoute);
        this.router.use('/category', categoryRoute);
        this.router.get('/', (req: Request, res: Response) => {
            res.send('Welcome to the API!');
        });
    }

    public getRouter(): Router {
        return this.router;
    }
}


