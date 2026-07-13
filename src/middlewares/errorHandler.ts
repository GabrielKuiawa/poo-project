import { NextFunction, Request, Response } from "express";
import BadRequestException from "../exception/BadRequestException";
import ConflictException from "../exception/ConflictException";
import HttpException from "../exception/HttpException";
import NotFoundException from "../exception/NotFoundException";
import PayloadTooLargeException from "../exception/PayloadTooLargeException";
import ServerErrorException from "../exception/ServerErrorException";
import { logger } from "../utils/Logger";

type ErrorWithMetadata = Error & {
  code?: string;
  type?: string;
};

export const notFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  next(new NotFoundException("Página não encontrada"));
};

export const globalErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    next(error);
    return;
  }

  const exception = normalizeError(error);
  const requestId = req.requestId ?? "unknown";

  if (exception.status >= 500) {
    const originalError = error instanceof Error ? error : undefined;
    logger.error("Request failed", {
      requestId,
      method: req.method,
      path: req.originalUrl,
      status: exception.status,
      errorName: originalError?.name ?? typeof error,
      errorMessage: originalError?.message ?? String(error),
      stack: originalError?.stack,
    });
  }

  res.status(exception.status).json({
    message: exception.message,
    status: exception.status,
    requestId,
  });
};

function normalizeError(error: unknown): HttpException {
  const metadata = error as ErrorWithMetadata | undefined;

  if (metadata?.type === "entity.too.large") {
    return new PayloadTooLargeException();
  }

  if (metadata?.type === "entity.parse.failed") {
    return new BadRequestException("JSON inválido");
  }

  if (metadata?.code === "ER_DUP_ENTRY") {
    return new ConflictException("Já existe um recurso com esses dados.");
  }

  if (error instanceof HttpException) {
    return error;
  }

  return new ServerErrorException();
}
