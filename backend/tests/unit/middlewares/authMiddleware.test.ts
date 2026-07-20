jest.mock("../../../src/config", () => ({
  config: { jwtSecret: "test-jwt-secret" },
}));

import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UserRole } from "../../../src/enum/UserRole";
import ForbiddenException from "../../../src/exception/ForbiddenException";
import { authMiddleware } from "../../../src/middlewares/authMiddleware";

const USER_ID = "123e4567-e89b-42d3-a456-426614174000";

function createRequest(method: string, readOnly: boolean): Request {
  const token = jwt.sign(
    { userId: USER_ID, role: UserRole.USER, readOnly },
    "test-jwt-secret",
  );

  return {
    method,
    headers: { authorization: `Bearer ${token}` },
  } as Request;
}

describe("authMiddleware", () => {
  const response = {} as Response;

  it("allows read operations for the public demo token", () => {
    const request = createRequest("GET", true);
    const next = jest.fn() as NextFunction;

    authMiddleware(request, response, next);

    expect(next).toHaveBeenCalledWith();
    expect(request.auth).toEqual({
      userId: USER_ID,
      role: UserRole.USER,
      readOnly: true,
    });
  });

  it.each(["POST", "PUT", "PATCH", "DELETE"])(
    "blocks %s operations for the public demo token",
    (method) => {
      const request = createRequest(method, true);
      const next = jest.fn() as NextFunction;

      authMiddleware(request, response, next);

      expect(next).toHaveBeenCalledWith(expect.any(ForbiddenException));
    },
  );

  it("allows write operations for a regular token", () => {
    const request = createRequest("POST", false);
    const next = jest.fn() as NextFunction;

    authMiddleware(request, response, next);

    expect(next).toHaveBeenCalledWith();
  });
});
