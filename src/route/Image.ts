import { NextFunction, Request, Response } from "express";
import { BaseRoute } from "./BaseRoute";
import { ImageController } from "../controller/ImageController";
import ImageRepository from "../repository/ImageRepository";
import { authMiddleware } from "../middlewares/authMiddleware";
import UserRepository from "../repository/UserRepository";
import CategoryRepository from "../repository/CategoryRepository";
import { ImageService } from "../service/ImageService";

export default class ImageRoute extends BaseRoute {
  private imageController: ImageController;

  constructor() {
    super();
    const imageRepository = new ImageRepository();
    const userRepository = new UserRepository();
    const categoryRepository = new CategoryRepository();

    const imageService = new ImageService(
      imageRepository,
      userRepository,
      categoryRepository,
    );

    this.imageController = new ImageController(imageService);

    this.initRoutes();
  }

  protected initRoutes(): void {
    this.router.get("/", (req: Request, res: Response, next: NextFunction) =>
      this.imageController.getImages(req, res, next),
    );
    this.router.post(
      "/",
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) =>
        this.imageController.saveImage(req, res, next),
    );
    this.router.get("/:id", (req: Request, res: Response, next: NextFunction) =>
      this.imageController.getImageById(req, res, next),
    );
    this.router.put(
      "/:id",
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) =>
        this.imageController.updateImage(req, res, next),
    );
    this.router.delete(
      "/:id",
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) =>
        this.imageController.deleteImage(req, res, next),
    );
  }
}
