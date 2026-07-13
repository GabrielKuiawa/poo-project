import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controller/UserController";
import UserRepository from "../repository/UserRepository";
import { BaseRoute } from "./BaseRoute";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware";
import { UserRole } from "../enum/UserRole";
import { UserService } from "../service/UserService";
import {
  createLoginRateLimiter,
  createRegistrationRateLimiter,
} from "../middlewares/rateLimit";

export default class UserRoute extends BaseRoute {
  private userController: UserController;

  constructor() {
    super();
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    this.userController = new UserController(userService);
    this.initRoutes();
  }

  protected initRoutes(): void {
    this.router.post(
      "/login",
      createLoginRateLimiter(),
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.login(req, res, next),
    );
    this.router.post(
      "/",
      createRegistrationRateLimiter(),
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.saveUser(req, res, next),
    );
    this.router.get(
      "/",
      authMiddleware,
      requireRole(UserRole.ADMIN),
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.getUsers(req, res, next),
    );
    this.router.get(
      "/images/:id",
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.getUserWithImages(req, res, next),
    );
    this.router.get(
      "/:id",
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.getUserById(req, res, next),
    );
    this.router.put(
      "/:id",
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.updateUser(req, res, next),
    );
    this.router.delete(
      "/:id",
      authMiddleware,
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.deleteUser(req, res, next),
    );
  }
}
