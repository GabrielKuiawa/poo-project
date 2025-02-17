import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controller/UserController";
import UserRepository from "../repository/UserRepository";
import { BaseRoute } from "./BaseRoute";

export default class UserRoute extends BaseRoute {
    private userController: UserController;

    constructor() {
        super();
        const userRepository = new UserRepository();
        this.userController = new UserController(userRepository);
    }

    protected initRoutes(): void {
        this.router.post('/login', (req: Request, res: Response, next:NextFunction) => this.userController.login(req, res, next));
        this.router.get('/', (req: Request, res: Response, next:NextFunction) => this.userController.getUsers(req, res, next));
        this.router.post('/', (req: Request, res: Response, next:NextFunction) => this.userController.saveUser(req, res, next));
        this.router.get('/:id', (req: Request, res: Response, next:NextFunction) => this.userController.getUserById(req, res, next));
        this.router.put('/:id', (req: Request, res: Response, next:NextFunction) => this.userController.updateUser(req, res, next));
        this.router.delete('/:id', (req: Request, res: Response, next:NextFunction) => this.userController.deleteUser(req, res, next));
        this.router.get('/images/:id', (req: Request, res: Response, next:NextFunction) => this.userController.getUserWithImages(req, res, next));
    }
}
