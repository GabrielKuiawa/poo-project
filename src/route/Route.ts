import { Router, Request, Response } from 'express';
import CategoryRoute from './CategoryRoute';



export default class Route {
    private router: Router = Router();

    constructor() {
        this.initRoute();
    }

    private initRoute() {
        const categoryRoute = new CategoryRoute();  
        this.router.use('/api', categoryRoute.getRouter());

        this.router.get('/', (req: Request, res: Response) => {
            res.send('Welcome to the API!');
        });
    }

    public getRouter(): Router {
        return this.router;
    }
}
