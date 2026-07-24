import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { saveAuthToken } from "@/lib/authTokenStorage";
import {
  createInitialImagesPage,
  imageService,
} from "@/features/images/services/imageService";
import { testApiUrl } from "@/tests/fixtures/api";
import { createAuthToken } from "@/tests/fixtures/auth";
import { createImage, createImagePage } from "@/tests/fixtures/images";

const image = createImage();

describe("imageService", () => {
  beforeEach(() => saveAuthToken(createAuthToken()));

  afterEach(() => {
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

    await expect(imageService.getById("image-id")).resolves.toEqual(image);
    expect(fetchMock).toHaveBeenCalledWith(
      `${testApiUrl}/api/image/image-id`,
      expect.objectContaining({
        headers: { Authorization: expect.stringMatching(/^Bearer /) },
      }),
    );
  });

  it("loads an authenticated image page", async () => {
    const page = createImagePage({ data: [image] });
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(page), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const pageUrl = `${testApiUrl}/api/image?page=1&limit=20`;
    await expect(imageService.getPage(pageUrl)).resolves.toEqual(page);
    expect(fetchMock).toHaveBeenCalledWith(
      pageUrl,
      expect.objectContaining({
        headers: { Authorization: expect.stringMatching(/^Bearer /) },
      }),
    );
  });

  it("creates a Pin with image data and categories", async () => {
    const file = new File(["pin"], "pin.webp", { type: "image/webp" });
    const responseBody = {
      message: "Imagem criada com sucesso",
      data: image,
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(responseBody), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      imageService.create({
        title: "Sala aconchegante",
        description: "Referência de decoração",
        image: file,
        categoryIds: ["category-1", "category-2"],
      }),
    ).resolves.toEqual(responseBody);

    const [url, request] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = request.body as FormData;
    expect(url).toBe(`${testApiUrl}/api/image`);
    expect(request.method).toBe("POST");
    expect(body.get("title")).toBe("Sala aconchegante");
    expect(body.get("description")).toBe("Referência de decoração");
    expect(body.get("image")).toBe(file);
    expect(body.getAll("categoryIds")).toEqual(["category-1", "category-2"]);
  });

  it("builds a feed URL with text and exact suggestion filters", () => {
    expect(
      createInitialImagesPage({
        query: "Arte abstrata",
        label: "Arte abstrata",
        type: "category",
        id: "category-id",
      }),
    ).toBe(
      "/api/image?page=1&limit=20&q=Arte+abstrata&type=category&id=category-id",
    );
  });

  it("reports an expired server session", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 401 })),
    );

    await expect(imageService.getById("image-id")).rejects.toThrow(
      "Sua sessão expirou. Entre novamente.",
    );
  });
});
