import { isRedirect } from "@tanstack/react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  clearAuthToken: vi.fn(),
  getAuthToken: vi.fn(),
  validateSession: vi.fn(),
}));

vi.mock("@/features/auth/authStorage", () => ({
  clearAuthToken: mocks.clearAuthToken,
  getAuthToken: mocks.getAuthToken,
}));

vi.mock("@/features/auth/api/validateSession", () => ({
  validateSession: mocks.validateSession,
}));

import {
  redirectAuthenticatedSession,
  requireAuthenticatedSession,
} from "@/features/auth/routeGuards";

async function expectRedirect(
  action: () => Promise<void>,
  destination: string,
): Promise<void> {
  try {
    await action();
    expect.fail("Expected the guard to redirect");
  } catch (error) {
    expect(isRedirect(error)).toBe(true);
    if (isRedirect(error)) {
      expect(error.options.to).toBe(destination);
    }
  }
}

describe("authentication route guards", () => {
  beforeEach(() => {
    mocks.clearAuthToken.mockReset();
    mocks.getAuthToken.mockReset();
    mocks.validateSession.mockReset();
  });

  it("redirects visitors away from private routes", async () => {
    mocks.getAuthToken.mockReturnValue(null);

    await expectRedirect(requireAuthenticatedSession, "/login");
    expect(mocks.validateSession).not.toHaveBeenCalled();
  });

  it("allows a private route after server-side session validation", async () => {
    mocks.getAuthToken.mockReturnValue("valid-token");
    mocks.validateSession.mockResolvedValue(true);

    await expect(requireAuthenticatedSession()).resolves.toBeUndefined();
    expect(mocks.validateSession).toHaveBeenCalledWith("valid-token");
  });

  it("clears an invalid session and redirects to login", async () => {
    mocks.getAuthToken.mockReturnValue("invalid-token");
    mocks.validateSession.mockResolvedValue(false);

    await expectRedirect(requireAuthenticatedSession, "/login");
    expect(mocks.clearAuthToken).toHaveBeenCalledOnce();
  });

  it("redirects an authenticated user away from login", async () => {
    mocks.getAuthToken.mockReturnValue("valid-token");
    mocks.validateSession.mockResolvedValue(true);

    await expectRedirect(redirectAuthenticatedSession, "/");
  });
});
