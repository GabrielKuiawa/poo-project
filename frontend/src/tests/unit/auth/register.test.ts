import { afterEach, describe, expect, it, vi } from "vitest";
import { register } from "@/features/auth/api/register";
import { testApiUrl } from "@/tests/fixtures/api";

describe("register", () => {
  afterEach(() => vi.unstubAllGlobals());

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

    await expect(
      register({
        name: "Maria Silva",
        email: "maria@example.com",
        password: "password123",
        pathImageUser: "/favicon.svg",
      }),
    ).resolves.toEqual(responseBody);

    expect(fetchMock).toHaveBeenCalledWith(
      `${testApiUrl}/api/user`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Maria Silva",
          email: "maria@example.com",
          password: "password123",
          pathImageUser: "/favicon.svg",
        }),
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

    await expect(
      register({
        name: "Maria Silva",
        email: "maria@example.com",
        password: "password123",
        pathImageUser: "/favicon.svg",
      }),
    ).rejects.toThrow("Email já está em uso.");
  });
});
