import { Request } from 'express';
import { UserRole } from '../enum/UserRole';
import ForbiddenException from '../exception/ForbiddenException';
import UnauthorizedException from '../exception/UnauthorizedException';

export function getAuthenticatedUserId(req: Request): string {
    if (!req.auth) {
        throw new UnauthorizedException();
    }

    return req.auth.userId;
}

export function assertOwnerOrAdmin(req: Request, ownerId: string): void {
    if (!req.auth) {
        throw new UnauthorizedException();
    }

    if (req.auth.userId !== ownerId && req.auth.role !== UserRole.ADMIN) {
        throw new ForbiddenException();
    }
}
