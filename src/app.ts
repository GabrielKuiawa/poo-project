import { Application } from 'express';
import express = require('express');
import { globalErrorHandler, notFoundHandler } from './middlewares/errorHandler';
import Route from './route/Route';

export default class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandling();
    }

    private initMiddlewares(): void {
        this.app.use(express.json());
    }

    private initRoutes(): void {
        const route = new Route();
        this.app.use('/', route.getRouter());
    }

    private initErrorHandling(): void {
        this.app.use(notFoundHandler);
        this.app.use(globalErrorHandler);
    }

    public getApp(): Application {
        return this.app;
    }
}
