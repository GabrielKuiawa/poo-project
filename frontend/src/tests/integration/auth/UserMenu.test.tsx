import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

const mocks = vi.hoisted(() => ({
  getCurrentUser: vi.fn(),
}));

vi.mock("@/features/auth/services/authService", () => ({
  authService: { getCurrentUser: mocks.getCurrentUser },
}));

import { UserMenu } from "@/features/auth/components/UserMenu";

describe("UserMenu", () => {
  beforeEach(() => {
    mocks.getCurrentUser.mockReset().mockResolvedValue({
      id: "user-id",
      name: "Maria Silva",
      email: "maria@example.com",
      pathImageUser: "https://example.com/avatar.jpg",
      role: "user",
    });
  });

  it("loads the current user when opened and exposes logout", async () => {
    const user = userEvent.setup();
    const onLogout = vi.fn();
    renderWithProviders(<UserMenu onLogout={onLogout} />);

    expect(mocks.getCurrentUser).not.toHaveBeenCalled();

    await user.click(
      screen.getByRole("button", { name: "Abrir menu do usuário" }),
    );

    expect(
      await screen.findByRole("dialog", { name: "Menu do usuário" }),
    ).toBeVisible();
    expect(await screen.findByText("Maria Silva")).toBeVisible();
    expect(screen.getByText("maria@example.com")).toBeVisible();
    expect(mocks.getCurrentUser).toHaveBeenCalledOnce();

    await user.click(screen.getByRole("button", { name: "Sair" }));
    expect(onLogout).toHaveBeenCalledOnce();
  });

  it("closes when Escape is pressed", async () => {
    const user = userEvent.setup();
    renderWithProviders(<UserMenu onLogout={vi.fn()} />);

    await user.click(
      screen.getByRole("button", { name: "Abrir menu do usuário" }),
    );
    expect(
      await screen.findByRole("dialog", { name: "Menu do usuário" }),
    ).toBeVisible();

    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("dialog", { name: "Menu do usuário" }),
    ).not.toBeInTheDocument();
  });
});
