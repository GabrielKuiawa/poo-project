import type { Image } from "../types";
import { getAuthToken } from "@/features/auth/authStorage";
import { apiUrl } from "@/lib/api";

export async function getImage(
  imageId: string,
  signal?: AbortSignal,
): Promise<Image> {
  const token = getAuthToken();
  const response = await fetch(`${apiUrl}/api/image/${imageId}`, {
    signal,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Sua sessão expirou. Entre novamente.");
    }

    throw new Error(`Não foi possível carregar a imagem: ${response.status}`);
  }

  return response.json() as Promise<Image>;
}
