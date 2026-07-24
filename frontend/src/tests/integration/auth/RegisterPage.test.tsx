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

vi.mock("@/features/auth/services/authService", () => ({
  authService: {
    login: mocks.login,
    register: mocks.register,
  },
}));
vi.mock("@/lib/authTokenStorage", () => ({
  saveAuthToken: mocks.saveAuthToken,
}));

import { RegisterPage } from "@/features/auth/pages/RegisterPage";

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
    const avatar = new File(["avatar"], "avatar.png", {
      type: "image/png",
    });

    await user.type(screen.getByLabelText("Nome"), "  Maria Silva  ");
    await user.type(screen.getByLabelText("Email"), "  maria@example.com  ");
    const avatarInput = screen.getByLabelText("Foto de perfil");
    await user.upload(avatarInput, avatar);
    expect((avatarInput as HTMLInputElement).files?.[0]).toBe(avatar);
    await user.type(screen.getByLabelText("Senha"), "password123");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    await waitFor(() => {
      expect(mocks.register).toHaveBeenCalledWith({
        name: "Maria Silva",
        email: "maria@example.com",
        password: "password123",
        image: avatar,
      });
    });
    expect(mocks.login).toHaveBeenCalledWith({
      email: "maria@example.com",
      password: "password123",
    });
    expect(mocks.saveAuthToken).toHaveBeenCalledWith("jwt-token");
    expect(mocks.navigate).toHaveBeenCalledWith({ to: "/feed" });
  });

  it("shows a registration error returned by the API", async () => {
    const user = userEvent.setup();
    mocks.register.mockRejectedValue(new Error("Email já está em uso."));
    renderRegisterPage();
    const avatar = new File(["avatar"], "avatar.webp", {
      type: "image/webp",
    });

    await user.type(screen.getByLabelText("Nome"), "Maria Silva");
    await user.type(screen.getByLabelText("Email"), "maria@example.com");
    const avatarInput = screen.getByLabelText("Foto de perfil");
    await user.upload(avatarInput, avatar);
    expect((avatarInput as HTMLInputElement).files?.[0]).toBe(avatar);
    await user.type(screen.getByLabelText("Senha"), "password123");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Email já está em uso.",
    );
    expect(mocks.login).not.toHaveBeenCalled();
    expect(mocks.navigate).not.toHaveBeenCalled();
  });

  it("requires a profile image before creating the account", async () => {
    const user = userEvent.setup();
    renderRegisterPage();

    await user.type(screen.getByLabelText("Nome"), "Maria Silva");
    await user.type(screen.getByLabelText("Email"), "maria@example.com");
    await user.type(screen.getByLabelText("Senha"), "password123");
    await user.click(screen.getByRole("button", { name: "Criar conta" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Escolha uma foto de perfil.",
    );
    expect(mocks.register).not.toHaveBeenCalled();
  });
});
