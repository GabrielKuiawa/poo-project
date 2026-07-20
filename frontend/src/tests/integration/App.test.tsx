import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createImage, createImagePage } from "@/tests/fixtures/images";
import { getLatestIntersectionObserver } from "@/tests/mocks/browserObservers";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

const mocks = vi.hoisted(() => ({
  clearAuthToken: vi.fn(),
  getImages: vi.fn(),
  isAuthenticated: vi.fn(),
  navigate: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  useNavigate: () => mocks.navigate,
}));

vi.mock("@/features/auth/authStorage", () => ({
  clearAuthToken: mocks.clearAuthToken,
  isAuthenticated: mocks.isAuthenticated,
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
    mocks.clearAuthToken.mockReset();
    mocks.getImages.mockReset();
    mocks.isAuthenticated.mockReset().mockReturnValue(true);
    mocks.navigate.mockReset().mockResolvedValue(undefined);
  });

  it("shows only the feed skeleton while the first page is loading", () => {
    mocks.getImages.mockReturnValue(new Promise(() => {}));

    renderWithProviders(<App />);

    expect(screen.getByRole("status")).toHaveTextContent("Carregando feed");
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
  });

  it("shows the API error when the first page cannot be loaded", async () => {
    mocks.getImages.mockRejectedValue(new Error("Falha ao carregar o feed."));

    renderWithProviders(<App />);

    expect(await screen.findByText("Falha ao carregar o feed.")).toBeVisible();
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
  });

  it("renders the authenticated header and an empty feed", async () => {
    mocks.getImages.mockResolvedValue(createImagePage({ data: [] }));

    renderWithProviders(<App />);

    expect(await screen.findByText("Lista vazia")).toBeVisible();
    expect(screen.getByRole("banner")).toBeVisible();
    expect(screen.getByRole("button", { name: "Sair" })).toBeVisible();
  });

  it("clears the session and navigates to login on logout", async () => {
    const user = userEvent.setup();
    mocks.getImages.mockResolvedValue(createImagePage({ data: [] }));
    renderWithProviders(<App />);

    await user.click(await screen.findByRole("button", { name: "Sair" }));

    expect(mocks.clearAuthToken).toHaveBeenCalledOnce();
    expect(mocks.navigate).toHaveBeenCalledWith({ to: "/login" });
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
