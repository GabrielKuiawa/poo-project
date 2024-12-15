import { Application } from 'express';
import express = require('express');
import { globalErrorHandler, notFoundHandler } from './middlewares/errorHandler';
import Route from './route/route';



const app: Application = express();
const route = new Route();

app.use(express.json());
app.use('/', route.getRouter()); 

app.use(notFoundHandler);

app.use(globalErrorHandler);

export default app;
