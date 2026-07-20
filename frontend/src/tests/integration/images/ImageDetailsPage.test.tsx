import { screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createImage } from "@/tests/fixtures/images";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

const mocks = vi.hoisted(() => ({
  getImage: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  getRouteApi: () => ({
    useParams: () => ({ imageId: "reference-id" }),
  }),
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

vi.mock("@/features/images/api/getImage", () => ({
  getImage: mocks.getImage,
}));

import { ImageDetailsPage } from "@/features/images/components/ImageDetailsPage";

describe("ImageDetailsPage", () => {
  beforeEach(() => {
    mocks.getImage.mockReset();
  });

  it("shows a loading message while the image is pending", () => {
    mocks.getImage.mockReturnValue(new Promise(() => {}));

    renderWithProviders(<ImageDetailsPage />);

    expect(screen.getByText("Carregando imagem...")).toBeVisible();
  });

  it("shows the request error", async () => {
    mocks.getImage.mockRejectedValue(
      new Error("Não foi possível carregar a imagem."),
    );

    renderWithProviders(<ImageDetailsPage />);

    expect(
      await screen.findByText("Não foi possível carregar a imagem."),
    ).toBeVisible();
  });

  it("renders image, author, categories, and the return link", async () => {
    mocks.getImage.mockResolvedValue(
      createImage({
        id: "reference-id",
        title: "Arquitetura brutalista",
        description: "Edifício de concreto aparente",
        categories: [
          { id: "architecture", name: "Arquitetura" },
          { id: "design", name: "Design" },
        ],
      }),
    );

    renderWithProviders(<ImageDetailsPage />);

    expect(
      await screen.findByRole("heading", { name: "Arquitetura brutalista" }),
    ).toBeVisible();
    expect(
      screen.getByRole("img", { name: "Edifício de concreto aparente" }),
    ).toBeVisible();
    expect(screen.getByText("Maria Silva")).toBeVisible();
    expect(screen.getByText("Arquitetura")).toBeVisible();
    expect(screen.getByText("Design")).toBeVisible();
    expect(screen.getByRole("link", { name: "Voltar" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(mocks.getImage).toHaveBeenCalledWith(
      "reference-id",
      expect.any(AbortSignal),
    );
  });

  it("omits the category list when the image has no categories", async () => {
    mocks.getImage.mockResolvedValue(createImage({ categories: [] }));

    renderWithProviders(<ImageDetailsPage />);

    expect(await screen.findByRole("heading")).toBeVisible();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
