import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

const mocks = vi.hoisted(() => ({
  register: vi.fn(),
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

vi.mock("@/features/auth/api/register", () => ({ register: mocks.register }));
vi.mock("@/features/auth/api/login", () => ({ login: mocks.login }));
vi.mock("@/features/auth/authStorage", () => ({
  saveAuthToken: mocks.saveAuthToken,
}));

import { RegisterPage } from "@/features/auth/components/RegisterPage";

function renderRegisterPage() {
  return renderWithProviders(<RegisterPage />);
}

describe("RegisterPage", () => {
  beforeEach(() => {
    mocks.register.mockReset().mockResolvedValue({
      message: "Usuário criado com sucesso",
      data: {},
    });
    mocks.login.mockReset().mockResolvedValue({
      message: "Login bem-sucedido",
      token: "jwt-token",
    });
    mocks.navigate.mockReset().mockResolvedValue(undefined);
    mocks.saveAuthToken.mockReset();
  });

  it("creates the account, signs in, and opens the gallery", async () => {
    const user = userEvent.setup();
    renderRegisterPage();

    await user.type(screen.getByLabelText("Nome"), "  Maria Silva  ");
    await user.type(screen.getByLabelText("Email"), "  maria@example.com  ");
    await user.type(
      screen.getByLabelText("URL da foto de perfil"),
      "  https://example.com/avatar.jpg  ",
    );
    await user.type(screen.getByLabelText("Senha"), "password123");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    await waitFor(() => {
      expect(mocks.register).toHaveBeenCalledWith({
        name: "Maria Silva",
        email: "maria@example.com",
        password: "password123",
        pathImageUser: "https://example.com/avatar.jpg",
      });
    });
    expect(mocks.login).toHaveBeenCalledWith({
      email: "maria@example.com",
      password: "password123",
    });
    expect(mocks.saveAuthToken).toHaveBeenCalledWith("jwt-token");
    expect(mocks.navigate).toHaveBeenCalledWith({ to: "/" });
  });

  it("shows a registration error returned by the API", async () => {
    const user = userEvent.setup();
    mocks.register.mockRejectedValue(new Error("Email já está em uso."));
    renderRegisterPage();

    await user.type(screen.getByLabelText("Nome"), "Maria Silva");
    await user.type(screen.getByLabelText("Email"), "maria@example.com");
    await user.type(
      screen.getByLabelText("URL da foto de perfil"),
      "https://example.com/avatar.jpg",
    );
    await user.type(screen.getByLabelText("Senha"), "password123");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Email já está em uso.",
    );
    expect(mocks.login).not.toHaveBeenCalled();
    expect(mocks.navigate).not.toHaveBeenCalled();
  });
});
