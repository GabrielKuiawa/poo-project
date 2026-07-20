import { RouterProvider } from "@tanstack/react-router";
import { act, screen } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { router } from "@/router";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

describe("application router", () => {
  it("registers the public and authenticated routes", () => {
    expect(Object.keys(router.routesByPath)).toEqual(
      expect.arrayContaining(["/", "/login", "/signup", "/images/$imageId"]),
    );
  });

  it("renders a public route and redirects visitors away from the feed", async () => {
    await router.navigate({ to: "/signup" });
    renderWithProviders(createElement(RouterProvider, { router }));

    expect(
      await screen.findByRole("heading", { name: "Crie sua conta" }),
    ).toBeVisible();

    await act(() => router.navigate({ to: "/" }));

    expect(
      await screen.findByRole("heading", { name: "Entre na sua conta" }),
    ).toBeVisible();
  });
});
