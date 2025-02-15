import { Request, Response, Router } from "express";
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
        this.router.post('/login', (req: Request, res: Response) => this.userController.login(req, res));
        this.router.get('/', (req: Request, res: Response) => this.userController.getUsers(req, res));
        this.router.post('/', (req: Request, res: Response) => this.userController.saveUser(req, res));
        this.router.get('/:id', (req: Request, res: Response) => this.userController.getUserById(req, res));
        this.router.put('/:id', (req: Request, res: Response) => this.userController.updateUser(req, res));
        this.router.delete('/:id', (req: Request, res: Response) => this.userController.deleteUser(req, res));
    }
}
