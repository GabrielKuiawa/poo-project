import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearAuthToken,
  getAuthToken,
  isAuthenticated,
  saveAuthToken,
} from "@/lib/authTokenStorage";
import { createAuthToken } from "@/tests/fixtures/auth";

describe("authTokenStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.useRealTimers();
  });

  it("stores and returns a non-expired token", () => {
    const token = createAuthToken({
      exp: Math.floor(Date.now() / 1000) + 60,
    });

    saveAuthToken(token);

    expect(getAuthToken()).toBe(token);
    expect(isAuthenticated()).toBe(true);
  });

  it("removes an expired token", () => {
    const token = createAuthToken({
      exp: Math.floor(Date.now() / 1000) - 1,
    });
    saveAuthToken(token);

    expect(getAuthToken()).toBeNull();
    expect(window.localStorage.length).toBe(0);
    expect(isAuthenticated()).toBe(false);
  });

  it("removes a malformed token", () => {
    saveAuthToken("not-a-jwt");

    expect(getAuthToken()).toBeNull();
    expect(window.localStorage.length).toBe(0);
  });

  it("clears the current token", () => {
    saveAuthToken(createAuthToken({ exp: Math.floor(Date.now() / 1000) + 60 }));

    clearAuthToken();

    expect(getAuthToken()).toBeNull();
  });
});
