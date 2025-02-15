import { Router, Request, Response } from "express";

export abstract class BaseRoute {
    protected router: Router = Router();

    constructor() {
        this.initRoutes();
    }

    protected abstract initRoutes(): void;

    public getRouter(): Router {
        return this.router;
    }
}
