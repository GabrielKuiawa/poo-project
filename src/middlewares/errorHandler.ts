import { Request, Response, NextFunction } from 'express';
import HttpException from '../exception/HttpException';
import NotFoundException from '../exception/NotFoundException';


export const globalErrorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Erro interno do servidor';

    res.status(status).json({
        erro: {
            status,
            mensagem: message,
        },
    });
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundException()); 
};