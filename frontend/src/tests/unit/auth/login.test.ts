import { afterEach, describe, expect, it, vi } from "vitest";
import { login } from "@/features/auth/api/login";
import { apiUrl } from "@/lib/api";

describe("login", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("sends the credentials and returns the session token", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(
          JSON.stringify({ message: "Login bem-sucedido", token: "jwt-token" }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      login({ email: "user@example.com", password: "password123" }),
    ).resolves.toEqual({
      message: "Login bem-sucedido",
      token: "jwt-token",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      `${apiUrl}/api/user/login`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "user@example.com",
          password: "password123",
        }),
      }),
    );
  });

  it("surfaces the error message returned by the API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({ message: "Email ou senha incorretos." }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          },
        ),
      ),
    );

    await expect(
      login({ email: "user@example.com", password: "wrong-password" }),
    ).rejects.toThrow("Email ou senha incorretos.");
  });

  it("rejects a successful response without a token", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: "Login bem-sucedido" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    await expect(
      login({ email: "user@example.com", password: "password123" }),
    ).rejects.toThrow("A resposta do servidor não contém uma sessão válida.");
  });
});
