
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import UnauthorizedException from '../exception/UnauthorizedException';
import HttpException from '../exception/HttpException';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        let exception: HttpException = new UnauthorizedException();
        const errorMenssage = exception.logErrorToFile(); 

        res.status(401).json({ message: errorMenssage }); 

        return;
    }
    const secretKey = 'default_secret';


    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' }); 
        }
        console.log(decoded)
        next(); 
    });
};
