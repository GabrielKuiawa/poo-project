import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/HttpException";
import NotFoundException from "../exception/NotFoundException";
import ServerErrorException from "../exception/ServerErrorException";
import BadRequestException from "../exception/BadRequestException";
import UnauthorizedException from "../exception/UnauthorizedException";


export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundException('Página não encontrada'));
};

export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let exception: HttpException = new ServerErrorException();
    let status: number = error.status || 500; 

    if (status === 404) {
        exception = new NotFoundException(error.message);
    } else if (status === 400) {
        exception = new BadRequestException(error.message);
    } else if (status === 401) {
        exception = new UnauthorizedException(error.message);
    } else if (status === 500) {
        exception = new ServerErrorException(error.message);
    }

    console.error(`[ERROR] ${status} - ${error.message || exception.message}`);

    const errorMessage = exception.logErrorToFile();

    res.status(status).json({ message: errorMessage, status });
};