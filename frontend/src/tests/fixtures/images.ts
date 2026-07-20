import type { Image, ImagePage } from "@/features/images/types";

export function createImage(overrides: Partial<Image> = {}): Image {
  return {
    id: "image-id",
    title: "Referência",
    pathImage: "https://example.com/image.jpg",
    description: "Uma imagem de referência",
    author: {
      id: "user-id",
      name: "Maria Silva",
      pathImageUser: "https://example.com/avatar.jpg",
    },
    categories: [],
    ...overrides,
  };
}

type ImagePageOptions = {
  data?: Image[];
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  next?: string | null;
  previous?: string | null;
};

export function createImagePage({
  data = [createImage()],
  page = 1,
  limit = 20,
  total = data.length,
  totalPages = total > 0 ? 1 : 0,
  next = null,
  previous = null,
}: ImagePageOptions = {}): ImagePage {
  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
      next,
      previous,
    },
  };
}
