import { NextFunction, Request, Response } from "express";
import { BaseRoute } from "./BaseRoute";
import { CategoryController } from "../controller/CategoryController";
import { authMiddleware } from "../middlewares/authMiddleware";
import CategoryRepository from "../repository/CategoryRepository";

export default class CategoryRoute extends BaseRoute {
    private categoryController: CategoryController;

    constructor() {
        super();
        const categoryRepository = new CategoryRepository();
        this.categoryController = new CategoryController(categoryRepository);
    }

    protected initRoutes(): void {
        // this.router.get('/', authMiddleware, (req: Request, res: Response) => this.categoryController.getCategories(req, res));
        this.router.get('/', (req: Request, res: Response, next:NextFunction) => this.categoryController.getCategories(req, res, next));
        this.router.post('/', (req: Request, res: Response, next:NextFunction) => this.categoryController.saveCategory(req, res, next));
        this.router.get('/:id', (req: Request, res: Response, next:NextFunction) => this.categoryController.getCategoryById(req, res, next));
        this.router.put('/:id', (req: Request, res: Response, next:NextFunction) => this.categoryController.updateCategory(req, res, next));
        this.router.delete('/:id', (req: Request, res: Response, next:NextFunction) => this.categoryController.deleteCategory(req, res, next));
    }
}
