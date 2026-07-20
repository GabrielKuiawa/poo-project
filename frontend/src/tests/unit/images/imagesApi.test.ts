import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { saveAuthToken } from "@/features/auth/authStorage";
import { getImage } from "@/features/images/api/getImage";
import { getImages } from "@/features/images/api/getImages";
import type { Image, ImagePage } from "@/features/images/types";
import { apiUrl } from "@/lib/api";

const image: Image = {
  id: "image-id",
  title: "Reference",
  pathImage: "/image.jpg",
  description: "A reference image",
  author: {
    id: "user-id",
    name: "User",
    pathImageUser: "/avatar.jpg",
  },
  categories: [],
};

function createValidToken(): string {
  const payload = window
    .btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 60 }))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `header.${payload}.signature`;
}

describe("images API", () => {
  beforeEach(() => saveAuthToken(createValidToken()));

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("sends the bearer token when loading an image", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(image), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(getImage("image-id")).resolves.toEqual(image);
    expect(fetchMock).toHaveBeenCalledWith(
      `${apiUrl}/api/image/image-id`,
      expect.objectContaining({
        headers: { Authorization: expect.stringMatching(/^Bearer /) },
      }),
    );
  });

  it("loads an authenticated image page after the minimum loading time", async () => {
    vi.useFakeTimers();
    const page: ImagePage = {
      data: [image],
      meta: {
        page: 1,
        limit: 20,
        total: 1,
        totalPages: 1,
        next: null,
        previous: null,
      },
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(page), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const pageUrl = `${apiUrl}/api/image?page=1&limit=20`;
    const request = getImages(pageUrl);
    await vi.advanceTimersByTimeAsync(700);

    await expect(request).resolves.toEqual(page);
    expect(fetchMock).toHaveBeenCalledWith(
      pageUrl,
      expect.objectContaining({
        headers: { Authorization: expect.stringMatching(/^Bearer /) },
      }),
    );
  });

  it("reports an expired server session", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 401 })),
    );

    await expect(getImage("image-id")).rejects.toThrow(
      "Sua sessão expirou. Entre novamente.",
    );
  });
});
