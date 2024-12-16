import { Router, Request, Response } from 'express';

import CategoryRepository from '../repository/CategoryRepository';
import { CategoryController } from '../controller/CategoryController';

export default class CategoryRoute {
    private router: Router = Router();
    private categoryController: CategoryController;

    constructor() {
        const categoryRepository = new CategoryRepository(); 
        this.categoryController = new CategoryController(categoryRepository);   
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get('/', (req: Request, res: Response) => this.categoryController.getCategories(req, res));
        this.router.post('/', (req: Request, res: Response) => this.categoryController.saveCategory(req, res));
        this.router.get('/:id', (req: Request, res: Response) => this.categoryController.getCategoryById(req, res));
        this.router.put('/:id', (req: Request, res: Response) => this.categoryController.updateCategory(req, res));
        this.router.delete('/:id', (req: Request, res: Response) => this.categoryController.deleteCategory(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }
}
