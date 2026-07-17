import { NextFunction, Request, Response } from "express";
import Category from "../models/Category";
import { CategoryService } from "../service/CategoryService";
import {
  getAuthenticatedUser,
  getAuthenticatedUserId,
} from "../utils/authorization";
import { validateId, validateTextField } from "../utils/validation";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  public async saveCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const name = validateTextField(req.body.name, "Nome", 100);
      const category = await this.categoryService.saveCategory(
        name,
        getAuthenticatedUserId(req),
      );
      res.status(201).json({
        message: "Categoria criada",
        data: this.serializeCategory(category),
      });
    } catch (error) {
      next(error);
    }
  }

  public async getCategories(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const categories = await this.categoryService.getCategories();
      res.json(categories.map((category) => this.serializeCategory(category)));
    } catch (error) {
      next(error);
    }
  }

  public async getAuthenticatedUserCategories(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const categories = await this.categoryService.getCategoriesByUserId(
        getAuthenticatedUserId(req),
      );
      res.json(categories.map((category) => this.serializeCategory(category)));
    } catch (error) {
      next(error);
    }
  }

  public async getCategoryById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id: string = validateId(req.params.id);
      const category = await this.categoryService.getCategoryById(id);

      res.json(this.serializeCategory(category));
    } catch (error) {
      next(error);
    }
  }

  public async updateCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = validateId(req.params.id);
      const name = validateTextField(req.body.name, "Nome", 100);

      const category = await this.categoryService.updateCategory(
        id,
        name,
        getAuthenticatedUser(req),
      );
      res.json({
        message: "Categoria atualizada",
        data: this.serializeCategory(category),
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = validateId(req.params.id);

      await this.categoryService.deleteCategory(id, getAuthenticatedUser(req));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  private serializeCategory(category: Category) {
    return { id: category.getId(), name: category.getName() };
  }
}
