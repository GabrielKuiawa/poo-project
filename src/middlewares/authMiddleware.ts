
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        res.status(401).json({ message: 'Token não fornecido' }); 
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
