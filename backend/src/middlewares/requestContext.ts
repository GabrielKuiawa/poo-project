import { randomUUID } from "node:crypto";
import { NextFunction, Request, Response } from "express";

const REQUEST_ID_PATTERN = /^[A-Za-z0-9._-]{1,100}$/;

export function requestContext(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const receivedRequestId = req.header("x-request-id");
  const requestId =
    receivedRequestId && REQUEST_ID_PATTERN.test(receivedRequestId)
      ? receivedRequestId
      : randomUUID();

  req.requestId = requestId;
  res.setHeader("X-Request-Id", requestId);
  next();
}
