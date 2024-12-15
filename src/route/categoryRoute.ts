import { Router, Request, Response } from 'express';
import CategoryController from '../controller/CategoryController';
import CategoryRepository from '../repository/CategoryRepository';

export default class CategoryRoute {
    private router: Router = Router();
    private categoryController: CategoryController;

    constructor() {
        const categoryRepository = new CategoryRepository(); 
        this.categoryController = new CategoryController(categoryRepository);   
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get('/category', (req: Request, res: Response) => this.categoryController.getCategories(req, res));
        this.router.post('/category', (req: Request, res: Response) => this.categoryController.saveCategory(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }
}
