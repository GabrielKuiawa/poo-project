import { act, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createImage, createImagePage } from "@/tests/fixtures/images";
import { getLatestIntersectionObserver } from "@/tests/mocks/browserObservers";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

const mocks = vi.hoisted(() => ({
  getImages: vi.fn(),
}));

vi.mock("@/features/images/api/getImages", () => ({
  firstImagesPage: "http://api.test/api/image?page=1&limit=20",
  getImages: mocks.getImages,
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

import App from "@/App";

describe("App", () => {
  beforeEach(() => {
    mocks.getImages.mockReset();
  });

  it("shows the feed skeleton while the first page is loading", () => {
    mocks.getImages.mockReturnValue(new Promise(() => {}));

    renderWithProviders(<App />);

    expect(screen.getByRole("status")).toHaveTextContent("Carregando feed");
  });

  it("shows the API error when the first page cannot be loaded", async () => {
    mocks.getImages.mockRejectedValue(new Error("Falha ao carregar o feed."));

    renderWithProviders(<App />);

    expect(await screen.findByText("Falha ao carregar o feed.")).toBeVisible();
  });

  it("renders an empty feed", async () => {
    mocks.getImages.mockResolvedValue(createImagePage({ data: [] }));

    renderWithProviders(<App />);

    expect(await screen.findByText("Lista vazia")).toBeVisible();
  });

  it("loads the next page when the pagination marker becomes visible", async () => {
    const firstImage = createImage({ id: "first", title: "Primeira" });
    const secondImage = createImage({ id: "second", title: "Segunda" });
    mocks.getImages
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

    renderWithProviders(<App />);

    expect(await screen.findByText("Primeira")).toBeVisible();
    await waitFor(() => expect(mocks.getImages).toHaveBeenCalledOnce());

    act(() => getLatestIntersectionObserver().trigger());

    expect(await screen.findByText("Segunda")).toBeVisible();
    expect(mocks.getImages).toHaveBeenNthCalledWith(
      2,
      "http://api.test/api/image?page=2&limit=20",
      expect.any(AbortSignal),
    );
  });
});
