import { rateLimit, RateLimitRequestHandler } from "express-rate-limit";
import TooManyRequestsException from "../exception/TooManyRequestsException";
import { logger } from "../utils/Logger";

const rateLimitLogger = {
  error(error: unknown, message?: string): void {
    logger.error(message ?? "Rate limiter error", describeError(error));
  },
  warn(error: unknown, message?: string): void {
    logger.warn(message ?? "Rate limiter warning", describeError(error));
  },
};

function describeError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return {
      errorName: error.name,
      errorMessage: error.message,
      stack: error.stack,
    };
  }

  return { error: String(error) };
}

function createRateLimiter(
  windowMs: number,
  limit: number,
  message: string,
  skipSuccessfulRequests = false,
): RateLimitRequestHandler {
  return rateLimit({
    windowMs,
    limit,
    skipSuccessfulRequests,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    logger: rateLimitLogger,
    handler: (_req, _res, next) => {
      next(new TooManyRequestsException(message));
    },
  });
}

export function createLoginRateLimiter(): RateLimitRequestHandler {
  return createRateLimiter(
    15 * 60 * 1000,
    5,
    "Muitas tentativas de login. Tente novamente em 15 minutos",
    true,
  );
}

export function createRegistrationRateLimiter(): RateLimitRequestHandler {
  return createRateLimiter(
    60 * 60 * 1000,
    3,
    "Muitas contas criadas a partir deste endereço. Tente novamente mais tarde",
  );
}
