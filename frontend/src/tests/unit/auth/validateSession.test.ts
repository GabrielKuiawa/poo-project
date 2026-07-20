import { afterEach, describe, expect, it, vi } from "vitest";
import { validateSession } from "@/features/auth/api/validateSession";
import { apiUrl } from "@/lib/api";

describe("validateSession", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("validates the token through the current-user endpoint", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(validateSession("valid-token")).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(`${apiUrl}/api/user/me`, {
      headers: { Authorization: "Bearer valid-token" },
    });
  });

  it.each([401, 403])(
    "returns false when the API responds with %s",
    async (status) => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(new Response(null, { status })),
      );

      await expect(validateSession("invalid-token")).resolves.toBe(false);
    },
  );

  it("throws when session validation is unavailable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 500 })),
    );

    await expect(validateSession("token")).rejects.toThrow(
      "Não foi possível validar sua sessão.",
    );
  });
});
