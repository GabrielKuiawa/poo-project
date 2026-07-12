import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/HttpException";
import ServerErrorException from "../exception/ServerErrorException";
import ConflictException from "../exception/ConflictException";
import NotFoundException from "../exception/NotFoundException";


export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundException('Página não encontrada'));
};

export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let exception: HttpException;

    if (error?.code === 'ER_DUP_ENTRY') {
        exception = new ConflictException('Já existe um recurso com esses dados.');
    } else if (isHttpException(error)) {
        exception = error;
    } else {
        exception = new ServerErrorException();
    }

    console.error(`[ERROR] ${exception.status} - ${error?.message || exception.message}`);

    const errorMessage = exception.logErrorToFile();

    res.status(exception.status).json({ message: errorMessage, status: exception.status });
};

function isHttpException(error: unknown): error is HttpException {
    if (!error || typeof error !== 'object') {
        return false;
    }

    const candidate = error as Partial<HttpException>;
    return typeof candidate.status === 'number'
        && typeof candidate.message === 'string'
        && typeof candidate.logErrorToFile === 'function';
}
