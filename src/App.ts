import { Application } from 'express';
import express = require('express');
import { globalErrorHandler, notFoundHandler} from './middlewares/errorHandler';
import { requestContext } from './middlewares/requestContext';
import Route from './route/Route';
import { AppDataSource } from './data-source'; 

export default class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.initMiddlewares(); 
    }

    public async initialize(): Promise<void> {
        await this.initDatabase();
        this.initRoutes();
    }

    private async initDatabase(): Promise<void> {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    }

    private initMiddlewares(): void {
        this.app.use(requestContext);
        this.app.use(express.json({ limit: '100kb' }));
    }

    private initRoutes(): void {
        const route = new Route();
        this.app.use('/', route.getRouter());
        this.initErrorHandling();
    }

    private initErrorHandling(): void {
        this.app.use(notFoundHandler)
        this.app.use(globalErrorHandler)
    }

    public getApp(): Application {
        return this.app;
    }
    
      
}
