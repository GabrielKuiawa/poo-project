import { NextFunction, Request, Response } from "express";
import { BaseRoute } from "./BaseRoute";
import { CategoryController } from "../controller/CategoryController";
import { authMiddleware } from "../middlewares/authMiddleware";
import CategoryRepository from "../repository/CategoryRepository";
import UserRepository from "../repository/UserRepository";
import { CategoryService } from "../service/CategoryService";

export default class CategoryRoute extends BaseRoute {
  private categoryController: CategoryController;

  constructor() {
    super();
    const categoryRepository = new CategoryRepository();
    const userRepository = new UserRepository();

    const categoryService = new CategoryService(
      categoryRepository,
      userRepository,
    );

    this.categoryController = new CategoryController(
      categoryRepository,
      categoryService,
    );

    this.initRoutes();
  }

  protected initRoutes(): void {
    this.router.get("/", (req: Request, res: Response, next: NextFunction) =>
      this.categoryController.getCategories(req, res, next),
    );
    this.router.post(
      "/",
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) =>
        this.categoryController.saveCategory(req, res, next),
    );
    this.router.get("/:id", (req: Request, res: Response, next: NextFunction) =>
      this.categoryController.getCategoryById(req, res, next),
    );
    this.router.put(
      "/:id",
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) =>
        this.categoryController.updateCategory(req, res, next),
    );
    this.router.delete(
      "/:id",
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) =>
        this.categoryController.deleteCategory(req, res, next),
    );
  }
}
