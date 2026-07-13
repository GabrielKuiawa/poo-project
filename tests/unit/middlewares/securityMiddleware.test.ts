import { Express, RequestHandler } from "express";
import express = require("express");
import request = require("supertest");
import {
  globalErrorHandler,
  notFoundHandler,
} from "../../../src/middlewares/errorHandler";
import {
  createLoginRateLimiter,
  createRegistrationRateLimiter,
} from "../../../src/middlewares/rateLimit";
import { requestContext } from "../../../src/middlewares/requestContext";

function createJsonApp(limit = "100kb"): Express {
  const app = express();
  app.use(requestContext);
  app.use(express.json({ limit }));
  app.post("/json", (_req, res) => res.status(204).send());
  app.get("/error", () => {
    throw new Error("Internal test error");
  });
  app.use(notFoundHandler);
  app.use(globalErrorHandler);
  return app;
}

function createLimitedApp(
  limiter: RequestHandler,
  successStatus: number,
): Express {
  const app = express();
  app.use(requestContext);
  app.post("/", limiter, (_req, res) => res.status(successStatus).send());
  app.use(globalErrorHandler);
  return app;
}

describe("request and error middleware", () => {
  it("returns 400 and preserves a valid request id for malformed JSON", async () => {
    const response = await request(createJsonApp())
      .post("/json")
      .set("Content-Type", "application/json")
      .set("X-Request-Id", "request-test-1")
      .send("{");

    expect(response.status).toBe(400);
    expect(response.headers["x-request-id"]).toBe("request-test-1");
    expect(response.body).toEqual({
      message: "JSON inválido",
      status: 400,
      requestId: "request-test-1",
    });
  });

  it("returns 413 when the JSON payload exceeds the configured limit", async () => {
    const response = await request(createJsonApp("1kb"))
      .post("/json")
      .send({ value: "x".repeat(2048) });

    expect(response.status).toBe(413);
    expect(response.body.message).toBe(
      "O corpo da requisição excede o limite permitido",
    );
    expect(response.body.requestId).toBe(response.headers["x-request-id"]);
  });

  it("writes unexpected errors as structured JSON", async () => {
    const writeSpy = jest
      .spyOn(process.stderr, "write")
      .mockImplementation(() => true);

    const response = await request(createJsonApp())
      .get("/error")
      .set("X-Request-Id", "request-error-1");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Erro no servidor");

    const logEntry = JSON.parse(String(writeSpy.mock.calls[0][0]));
    expect(logEntry).toMatchObject({
      level: "error",
      message: "Request failed",
      requestId: "request-error-1",
      method: "GET",
      path: "/error",
      status: 500,
      errorMessage: "Internal test error",
    });

    writeSpy.mockRestore();
  });
});

describe("authentication rate limits", () => {
  it("blocks the sixth failed login attempt", async () => {
    const app = createLimitedApp(createLoginRateLimiter(), 401);

    for (let attempt = 1; attempt <= 5; attempt += 1) {
      await request(app).post("/").expect(401);
    }

    const response = await request(app).post("/");

    expect(response.status).toBe(429);
    expect(response.body.message).toContain("Muitas tentativas de login");
    expect(response.headers).toHaveProperty("ratelimit");
    expect(response.headers).toHaveProperty("ratelimit-policy");
    expect(response.headers).toHaveProperty("retry-after");
  });

  it("does not count successful logins against the failure limit", async () => {
    const app = createLimitedApp(createLoginRateLimiter(), 204);

    for (let attempt = 1; attempt <= 7; attempt += 1) {
      await request(app).post("/").expect(204);
    }
  });

  it("blocks the fourth registration attempt", async () => {
    const app = createLimitedApp(createRegistrationRateLimiter(), 201);

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      await request(app).post("/").expect(201);
    }

    const response = await request(app).post("/");

    expect(response.status).toBe(429);
    expect(response.body.message).toContain("Muitas contas criadas");
  });
});
