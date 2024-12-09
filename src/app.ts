import { Application } from 'express';
import express = require('express');
import routes from './route/routes';
import { globalErrorHandler, notFoundHandler } from './middlewares/errorHandler';

const app: Application = express();

app.use(express.json());
app.use('/', routes); 

app.use(notFoundHandler);

app.use(globalErrorHandler);

export default app;
