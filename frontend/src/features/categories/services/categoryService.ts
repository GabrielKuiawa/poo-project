import { apiRequest } from "@/lib/api";

export type Category = {
  id: string;
  name: string;
};

type CategoryPage = {
  data: Category[];
};

export const categoryService = {
  getMine(signal?: AbortSignal): Promise<CategoryPage> {
    return apiRequest<CategoryPage>("/api/category/mine?page=1&limit=100", {
      signal,
      authenticated: true,
      errorMessage: "Não foi possível carregar suas pastas.",
    });
  },
};
