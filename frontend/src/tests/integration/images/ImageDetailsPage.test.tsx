import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createImage, createImagePage } from "@/tests/fixtures/images";
import { getLatestIntersectionObserver } from "@/tests/mocks/browserObservers";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

const mocks = vi.hoisted(() => ({
  getById: vi.fn(),
  getPage: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  getRouteApi: () => ({
    useParams: () => ({ imageId: "reference-id" }),
  }),
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

vi.mock("@/features/images/services/imageService", () => ({
  initialImagesPage: "/api/image?page=1&limit=20",
  imageService: { getById: mocks.getById, getPage: mocks.getPage },
}));

import { ImageDetailsPage } from "@/features/images/pages/ImageDetailsPage";

describe("ImageDetailsPage", () => {
  beforeEach(() => {
    mocks.getById.mockReset();
    mocks.getPage.mockReset().mockResolvedValue(createImagePage({ data: [] }));
  });

  it("shows a loading message while the image is pending", () => {
    mocks.getById.mockReturnValue(new Promise(() => {}));

    renderWithProviders(<ImageDetailsPage />);

    expect(screen.getByText("Carregando imagem...")).toBeVisible();
  });

  it("shows the request error", async () => {
    mocks.getById.mockRejectedValue(
      new Error("Não foi possível carregar a imagem."),
    );

    renderWithProviders(<ImageDetailsPage />);

    expect(
      await screen.findByText("Não foi possível carregar a imagem."),
    ).toBeVisible();
  });

  it("renders image, author, categories, and the return link", async () => {
    mocks.getById.mockResolvedValue(
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
    expect(mocks.getById).toHaveBeenCalledWith(
      "reference-id",
      expect.any(AbortSignal),
    );
  });

  it("omits the category list when the image has no categories", async () => {
    mocks.getById.mockResolvedValue(createImage({ categories: [] }));

    renderWithProviders(<ImageDetailsPage />);

    expect(await screen.findByRole("heading")).toBeVisible();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("opens and closes the expanded image viewer", async () => {
    const user = userEvent.setup();
    mocks.getById.mockResolvedValue(
      createImage({ id: "reference-id", title: "Paisagem ampliada" }),
    );

    renderWithProviders(<ImageDetailsPage />);

    await user.click(
      await screen.findByRole("button", { name: "Expandir imagem" }),
    );
    expect(
      screen.getByRole("dialog", {
        name: "Visualização ampliada de Paisagem ampliada",
      }),
    ).toBeVisible();

    await user.click(
      screen.getByRole("button", { name: "Fechar imagem ampliada" }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("loads more masonry items when the pagination marker is visible", async () => {
    mocks.getById.mockResolvedValue(createImage({ id: "reference-id" }));
    mocks.getPage
      .mockResolvedValueOnce(
        createImagePage({
          data: [createImage({ id: "first", title: "Primeira ideia" })],
          next: "/api/image?page=2&limit=20",
          total: 2,
          totalPages: 2,
        }),
      )
      .mockResolvedValueOnce(
        createImagePage({
          data: [createImage({ id: "second", title: "Segunda ideia" })],
          page: 2,
          previous: "/api/image?page=1&limit=20",
          total: 2,
          totalPages: 2,
        }),
      );

    renderWithProviders(<ImageDetailsPage />);

    await screen.findByRole("heading", { name: "Referência" });
    await waitFor(() => expect(mocks.getPage).toHaveBeenCalledOnce());

    act(() => getLatestIntersectionObserver().trigger());

    await waitFor(() => expect(mocks.getPage).toHaveBeenCalledTimes(2));
    expect(mocks.getPage).toHaveBeenLastCalledWith(
      "/api/image?page=2&limit=20",
      expect.any(AbortSignal),
    );
  });
});
