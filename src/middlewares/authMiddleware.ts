
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import UnauthorizedException from '../exception/UnauthorizedException';
import ForbiddenException from '../exception/ForbiddenException';
import { config } from '../config';
import { UserRole } from '../enum/UserRole';

interface AuthenticationPayload extends jwt.JwtPayload {
    userId: string;
    role: UserRole;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const [scheme, token] = req.headers.authorization?.split(' ') ?? [];

    if (scheme !== 'Bearer' || !token) {
        next(new UnauthorizedException('Token de autenticação não informado'));
        return;
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as AuthenticationPayload;

        if (!decoded.userId || !Object.values(UserRole).includes(decoded.role)) {
            next(new UnauthorizedException('Token de autenticação inválido'));
            return;
        }

        req.auth = { userId: decoded.userId, role: decoded.role };
        next();
    } catch {
        next(new UnauthorizedException('Token de autenticação inválido ou expirado'));
    }
};

export const requireRole = (role: UserRole) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.auth) {
            next(new UnauthorizedException());
            return;
        }

        if (req.auth.role !== role) {
            next(new ForbiddenException());
            return;
        }

        next();
    };
};
