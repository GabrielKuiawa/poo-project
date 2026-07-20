import { ApiError, apiRequest } from "@/lib/api";

export async function validateSession(token: string): Promise<boolean> {
  try {
    await apiRequest<unknown>("/api/user/me", {
      token,
      errorMessage: "Não foi possível validar sua sessão.",
      useServerErrorMessage: false,
    });
  } catch (error) {
    if (error instanceof ApiError && [401, 403].includes(error.status)) {
      return false;
    }

    throw error;
  }

  return true;
}
