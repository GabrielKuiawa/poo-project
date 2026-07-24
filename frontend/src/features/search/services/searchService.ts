import { apiRequest } from "@/lib/api";
import type { SearchSuggestionResponse } from "../types";

const suggestionsPath = "/api/search/suggestions";

export const searchService = {
  getSuggestions(
    query: string,
    signal?: AbortSignal,
  ): Promise<SearchSuggestionResponse> {
    const searchParams = new URLSearchParams({
      q: query,
      limit: "9",
    });

    return apiRequest<SearchSuggestionResponse>(
      `${suggestionsPath}?${searchParams.toString()}`,
      {
        signal,
        authenticated: true,
        errorMessage: (status) =>
          status === 401
            ? "Sua sessão expirou. Entre novamente."
            : "Não foi possível carregar as sugestões.",
        useServerErrorMessage: false,
      },
    );
  },
};
