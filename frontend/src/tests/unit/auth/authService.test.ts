import { afterEach, describe, expect, it, vi } from "vitest";
import { authService } from "@/features/auth/services/authService";
import { saveAuthToken } from "@/lib/authTokenStorage";
import { testApiUrl } from "@/tests/fixtures/api";
import { createAuthToken } from "@/tests/fixtures/auth";

describe("authService", () => {
  afterEach(() => vi.unstubAllGlobals());

  describe("login", () => {
    it("sends the credentials and returns the session token", async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            message: "Login bem-sucedido",
            token: "jwt-token",
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      );
      vi.stubGlobal("fetch", fetchMock);

      await expect(
        authService.login({
          email: "user@example.com",
          password: "password123",
        }),
      ).resolves.toEqual({
        message: "Login bem-sucedido",
        token: "jwt-token",
      });

      expect(fetchMock).toHaveBeenCalledWith(
        `${testApiUrl}/api/user/login`,
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
        authService.login({
          email: "user@example.com",
          password: "wrong-password",
        }),
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
        authService.login({
          email: "user@example.com",
          password: "password123",
        }),
      ).rejects.toThrow("A resposta do servidor não contém uma sessão válida.");
    });
  });

  describe("register", () => {
    const registrationData = {
      name: "Maria Silva",
      email: "maria@example.com",
      password: "password123",
      pathImageUser: "/favicon.svg",
    };

    it("sends the new account data to the API", async () => {
      const responseBody = {
        message: "Usuário criado com sucesso",
        data: {
          id: "user-id",
          name: "Maria Silva",
          email: "maria@example.com",
          pathImageUser: "/favicon.svg",
          role: "user",
        },
      };
      const fetchMock = vi.fn().mockResolvedValue(
        new Response(JSON.stringify(responseBody), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }),
      );
      vi.stubGlobal("fetch", fetchMock);

      await expect(authService.register(registrationData)).resolves.toEqual(
        responseBody,
      );

      expect(fetchMock).toHaveBeenCalledWith(
        `${testApiUrl}/api/user`,
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registrationData),
        }),
      );
    });

    it("surfaces a registration error returned by the API", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(
          new Response(JSON.stringify({ message: "Email já está em uso." }), {
            status: 409,
            headers: { "Content-Type": "application/json" },
          }),
        ),
      );

      await expect(authService.register(registrationData)).rejects.toThrow(
        "Email já está em uso.",
      );
    });
  });

  describe("getCurrentUser", () => {
    it("returns the authenticated user", async () => {
      const token = createAuthToken();
      const currentUser = {
        id: "user-id",
        name: "Maria Silva",
        email: "maria@example.com",
        pathImageUser: "https://example.com/avatar.jpg",
        role: "user",
      };
      const fetchMock = vi.fn().mockResolvedValue(
        new Response(JSON.stringify(currentUser), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
      vi.stubGlobal("fetch", fetchMock);
      saveAuthToken(token);

      await expect(authService.getCurrentUser()).resolves.toEqual(currentUser);
      expect(fetchMock).toHaveBeenCalledWith(`${testApiUrl}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    });
  });

  describe("validateSession", () => {
    it("validates the token through the current-user endpoint", async () => {
      const fetchMock = vi
        .fn()
        .mockResolvedValue(new Response("{}", { status: 200 }));
      vi.stubGlobal("fetch", fetchMock);

      await expect(authService.validateSession("valid-token")).resolves.toBe(
        true,
      );
      expect(fetchMock).toHaveBeenCalledWith(`${testApiUrl}/api/user/me`, {
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

        await expect(
          authService.validateSession("invalid-token"),
        ).resolves.toBe(false);
      },
    );

    it("throws when session validation is unavailable", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(new Response(null, { status: 500 })),
      );

      await expect(authService.validateSession("token")).rejects.toThrow(
        "Não foi possível validar sua sessão.",
      );
    });
  });
});
