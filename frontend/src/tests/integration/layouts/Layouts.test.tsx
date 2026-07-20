import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  clearAuthToken: vi.fn(),
  navigate: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  Outlet: () => <main>Conteúdo da rota</main>,
  useNavigate: () => mocks.navigate,
}));

vi.mock("@/features/auth/authStorage", () => ({
  clearAuthToken: mocks.clearAuthToken,
}));

import { AppLayout } from "@/app/layouts/AppLayout";
import { AuthLayout } from "@/app/layouts/AuthLayout";

describe("AppLayout", () => {
  beforeEach(() => {
    mocks.clearAuthToken.mockReset();
    mocks.navigate.mockReset().mockResolvedValue(undefined);
  });

  it("keeps navigation separate from the active route content", () => {
    render(<AppLayout />);

    expect(screen.getByRole("banner")).toBeVisible();
    expect(screen.getByRole("link", { name: "mood board" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByText("Conteúdo da rota")).toBeVisible();
  });

  it("clears the token and opens login on logout", async () => {
    const user = userEvent.setup();
    render(<AppLayout />);

    await user.click(screen.getByRole("button", { name: "Sair" }));

    expect(mocks.clearAuthToken).toHaveBeenCalledOnce();
    expect(mocks.navigate).toHaveBeenCalledWith({ to: "/login" });
  });
});

describe("AuthLayout", () => {
  it("composes shared branding, hero, footer, and form panel", () => {
    render(
      <AuthLayout
        hero={<h1>Mensagem principal</h1>}
        footer={<p>Mensagem de apoio</p>}
        panelClassName="max-w-md"
      >
        <form aria-label="Formulário de autenticação" />
      </AuthLayout>,
    );

    expect(screen.getAllByRole("link", { name: "mood board" })).toHaveLength(2);
    expect(
      screen.getByRole("heading", { name: "Mensagem principal" }),
    ).toBeVisible();
    expect(screen.getByText("Mensagem de apoio")).toBeVisible();
    expect(
      screen.getByRole("form", { name: "Formulário de autenticação" }),
    ).toBeVisible();
  });
});
