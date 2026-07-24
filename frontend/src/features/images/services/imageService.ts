import type {
  CreateImageData,
  CreateImageResponse,
  Image,
  ImagePage,
} from "../types";
import { apiRequest } from "@/lib/api";
import type { ActiveSearch } from "@/features/search/types";

const imagesPath = "/api/image";

export const initialImagesPage = `${imagesPath}?page=1&limit=20`;

export function createInitialImagesPage(search: ActiveSearch | null): string {
  if (!search) return initialImagesPage;

  const searchParams = new URLSearchParams({
    page: "1",
    limit: "20",
    q: search.query,
  });

  if (search.type && search.id) {
    searchParams.set("type", search.type);
    searchParams.set("id", search.id);
  }

  return `${imagesPath}?${searchParams.toString()}`;
}

export const imageService = {
  create({
    title,
    description,
    image,
    categoryIds,
  }: CreateImageData): Promise<CreateImageResponse> {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    for (const categoryId of categoryIds) {
      formData.append("categoryIds", categoryId);
    }

    return apiRequest<CreateImageResponse>(imagesPath, {
      method: "POST",
      body: formData,
      authenticated: true,
      errorMessage: "Não foi possível criar o Pin. Tente novamente.",
    });
  },

  getById(imageId: string, signal?: AbortSignal): Promise<Image> {
    return apiRequest<Image>(`${imagesPath}/${imageId}`, {
      signal,
      authenticated: true,
      errorMessage: (status) =>
        status === 401
          ? "Sua sessão expirou. Entre novamente."
          : `Não foi possível carregar a imagem: ${status}`,
      useServerErrorMessage: false,
    });
  },

  getPage(pageUrl: string, signal?: AbortSignal): Promise<ImagePage> {
    return apiRequest<ImagePage>(pageUrl, {
      signal,
      authenticated: true,
      errorMessage: (status) =>
        status === 401
          ? "Sua sessão expirou. Entre novamente."
          : `Não foi possível carregar as imagens: ${status}`,
      useServerErrorMessage: false,
    });
  },
};
