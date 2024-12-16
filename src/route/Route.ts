import { Router, Request, Response } from 'express';
import CategoryRoute from './CategoryRoute';
import ImageRoute from './Image';
import UserRoute from './UserRoute';



export default class Route {
    private router: Router = Router();

    constructor() {
        this.initRoute();
    }

    private initRoute() {
        const categoryRoute = new CategoryRoute();  
        const imageRoute = new ImageRoute();  
        const userRoute = new UserRoute();  
        this.router.use('/api/category', categoryRoute.getRouter());
        this.router.use('/api/image', imageRoute.getRouter());
        this.router.use('/api/user', userRoute.getRouter());
    }

    public getRouter(): Router {
        return this.router;
    }
}
