import type { Image, ImagePage } from "../types";
import { apiRequest } from "@/lib/api";

const imagesPath = "/api/image";

export const initialImagesPage = `${imagesPath}?page=1&limit=20`;

export const imageService = {
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
