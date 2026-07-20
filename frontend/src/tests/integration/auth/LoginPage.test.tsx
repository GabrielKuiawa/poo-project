import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  login: vi.fn(),
  navigate: vi.fn(),
  saveAuthToken: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  useNavigate: () => mocks.navigate,
}));

vi.mock("@/features/auth/api/login", () => ({ login: mocks.login }));
vi.mock("@/features/auth/authStorage", () => ({
  saveAuthToken: mocks.saveAuthToken,
}));

import { LoginPage } from "@/features/auth/components/LoginPage";

function renderLoginPage() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <LoginPage />
    </QueryClientProvider>,
  );
}

describe("LoginPage", () => {
  beforeEach(() => {
    mocks.login.mockReset();
    mocks.navigate.mockReset().mockResolvedValue(undefined);
    mocks.saveAuthToken.mockReset();
  });

  it("submits credentials, stores the token, and opens the gallery", async () => {
    const user = userEvent.setup();
    mocks.login.mockResolvedValue({
      message: "Login bem-sucedido",
      token: "jwt-token",
    });
    renderLoginPage();

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Senha"), "password123");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(mocks.login).toHaveBeenCalledWith(
        {
          email: "user@example.com",
          password: "password123",
        },
        expect.any(Object),
      );
    });
    expect(mocks.saveAuthToken).toHaveBeenCalledWith("jwt-token");
    expect(mocks.navigate).toHaveBeenCalledWith({ to: "/" });
  });

  it("shows an authentication error returned by the API", async () => {
    const user = userEvent.setup();
    mocks.login.mockRejectedValue(new Error("Email ou senha incorretos."));
    renderLoginPage();

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Senha"), "wrong-pass");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Email ou senha incorretos.",
    );
    expect(mocks.saveAuthToken).not.toHaveBeenCalled();
    expect(mocks.navigate).not.toHaveBeenCalled();
  });

  it("allows the password to be shown and hidden", async () => {
    const user = userEvent.setup();
    renderLoginPage();
    const passwordInput = screen.getByLabelText("Senha");

    expect(passwordInput).toHaveAttribute("type", "password");
    await user.click(screen.getByRole("button", { name: "Mostrar senha" }));
    expect(passwordInput).toHaveAttribute("type", "text");
    await user.click(screen.getByRole("button", { name: "Ocultar senha" }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
