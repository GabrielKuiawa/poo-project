import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { saveAuthToken } from "@/features/auth/authStorage";
import { getImage } from "@/features/images/api/getImage";
import { getImages } from "@/features/images/api/getImages";
import { apiUrl } from "@/lib/api";
import { createAuthToken } from "@/tests/fixtures/auth";
import { createImage, createImagePage } from "@/tests/fixtures/images";

const image = createImage();

describe("images API", () => {
  beforeEach(() => saveAuthToken(createAuthToken()));

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
    const page = createImagePage({ data: [image] });
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
