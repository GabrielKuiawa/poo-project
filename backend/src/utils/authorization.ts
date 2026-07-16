import { Request } from "express";
import { UserRole } from "../enum/UserRole";
import ForbiddenException from "../exception/ForbiddenException";
import UnauthorizedException from "../exception/UnauthorizedException";
import { AuthenticatedUser } from "../types/AuthenticatedUser";

export function getAuthenticatedUser(req: Request): AuthenticatedUser {
  if (!req.auth) {
    throw new UnauthorizedException();
  }

  return req.auth;
}

export function getAuthenticatedUserId(req: Request): string {
  return getAuthenticatedUser(req).userId;
}

export function assertOwnerOrAdmin(
  authenticatedUser: AuthenticatedUser,
  ownerId: string,
): void {
  const isOwner = authenticatedUser.userId === ownerId;
  const isAdmin = authenticatedUser.role === UserRole.ADMIN;

  if (!isOwner && !isAdmin) {
    throw new ForbiddenException();
  }
}
