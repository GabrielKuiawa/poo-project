import { act, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createImage, createImagePage } from "@/tests/fixtures/images";
import { getLatestIntersectionObserver } from "@/tests/mocks/browserObservers";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

const mocks = vi.hoisted(() => ({
  getPage: vi.fn(),
}));

vi.mock("@/features/images/services/imageService", () => ({
  initialImagesPage: "/api/image?page=1&limit=20",
  imageService: { getPage: mocks.getPage },
}));

vi.mock("@/features/images/components/ImageList", () => ({
  ImageList: ({
    images,
    isLoadingMore,
  }: {
    images: { id: string; title: string }[];
    isLoadingMore?: boolean;
  }) => (
    <div aria-label="Lista de imagens" data-loading={isLoadingMore}>
      {images.map((image) => (
        <span key={image.id}>{image.title}</span>
      ))}
      {images.length === 0 && <span>Lista vazia</span>}
    </div>
  ),
}));

vi.mock("@/features/images/components/ImageListSkeleton", () => ({
  ImageListSkeleton: () => <div role="status">Carregando feed</div>,
}));

import { ImageFeedPage } from "@/features/images/pages/ImageFeedPage";

describe("ImageFeedPage", () => {
  beforeEach(() => {
    mocks.getPage.mockReset();
  });

  it("shows the feed skeleton while the first page is loading", () => {
    mocks.getPage.mockReturnValue(new Promise(() => {}));

    renderWithProviders(<ImageFeedPage />);

    expect(screen.getByRole("status")).toHaveTextContent("Carregando feed");
  });

  it("shows the API error when the first page cannot be loaded", async () => {
    mocks.getPage.mockRejectedValue(new Error("Falha ao carregar o feed."));

    renderWithProviders(<ImageFeedPage />);

    expect(await screen.findByText("Falha ao carregar o feed.")).toBeVisible();
  });

  it("renders an empty feed", async () => {
    mocks.getPage.mockResolvedValue(createImagePage({ data: [] }));

    renderWithProviders(<ImageFeedPage />);

    expect(await screen.findByText("Lista vazia")).toBeVisible();
  });

  it("preserves the image order returned by the API", async () => {
    mocks.getPage.mockResolvedValue(
      createImagePage({
        data: [
          createImage({ id: "third", title: "Terceira" }),
          createImage({ id: "first", title: "Primeira" }),
          createImage({ id: "second", title: "Segunda" }),
        ],
      }),
    );

    renderWithProviders(<ImageFeedPage />);

    const list = await screen.findByLabelText("Lista de imagens");
    expect(list).toHaveTextContent("TerceiraPrimeiraSegunda");
  });

  it("loads the next page when the pagination marker becomes visible", async () => {
    const firstImage = createImage({ id: "first", title: "Primeira" });
    const secondImage = createImage({ id: "second", title: "Segunda" });
    mocks.getPage
      .mockResolvedValueOnce(
        createImagePage({
          data: [firstImage],
          next: "http://api.test/api/image?page=2&limit=20",
          total: 2,
          totalPages: 2,
        }),
      )
      .mockResolvedValueOnce(
        createImagePage({
          data: [secondImage],
          page: 2,
          previous: "http://api.test/api/image?page=1&limit=20",
          total: 2,
          totalPages: 2,
        }),
      );

    renderWithProviders(<ImageFeedPage />);

    expect(await screen.findByText("Primeira")).toBeVisible();
    await waitFor(() => expect(mocks.getPage).toHaveBeenCalledOnce());

    act(() => getLatestIntersectionObserver().trigger());

    expect(await screen.findByText("Segunda")).toBeVisible();
    expect(mocks.getPage).toHaveBeenNthCalledWith(
      2,
      "http://api.test/api/image?page=2&limit=20",
      expect.any(AbortSignal),
    );
  });
});
