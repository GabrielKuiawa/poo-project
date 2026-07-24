import { NextFunction, Request, Response } from "express";
import { SearchController } from "../controller/SearchController";
import { authMiddleware } from "../middlewares/authMiddleware";
import CategoryRepository from "../repository/CategoryRepository";
import ImageRepository from "../repository/ImageRepository";
import UserRepository from "../repository/UserRepository";
import { SearchService } from "../service/SearchService";
import { BaseRoute } from "./BaseRoute";

export default class SearchRoute extends BaseRoute {
  private readonly searchController: SearchController;

  constructor() {
    super();
    this.searchController = new SearchController(
      new SearchService(
        new ImageRepository(),
        new CategoryRepository(),
        new UserRepository(),
      ),
    );
    this.initRoutes();
  }

  protected initRoutes(): void {
    this.router.get(
      "/suggestions",
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) =>
        this.searchController.getSuggestions(req, res, next),
    );
  }
}
