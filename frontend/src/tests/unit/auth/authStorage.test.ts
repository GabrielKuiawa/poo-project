import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearAuthToken,
  getAuthToken,
  isAuthenticated,
  saveAuthToken,
} from "@/features/auth/authStorage";

function createToken(payload: Record<string, unknown>): string {
  const encodedPayload = window
    .btoa(JSON.stringify(payload))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `header.${encodedPayload}.signature`;
}

describe("authStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.useRealTimers();
  });

  it("stores and returns a non-expired token", () => {
    const token = createToken({ exp: Math.floor(Date.now() / 1000) + 60 });

    saveAuthToken(token);

    expect(getAuthToken()).toBe(token);
    expect(isAuthenticated()).toBe(true);
  });

  it("removes an expired token", () => {
    const token = createToken({ exp: Math.floor(Date.now() / 1000) - 1 });
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
    saveAuthToken(createToken({ exp: Math.floor(Date.now() / 1000) + 60 }));

    clearAuthToken();

    expect(getAuthToken()).toBeNull();
  });
});
