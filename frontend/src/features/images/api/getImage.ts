import type { Image } from "../types";

const apiUrl = (
  import.meta.env.VITE_API_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export async function getImage(
  imageId: string,
  signal?: AbortSignal,
): Promise<Image> {
  const response = await fetch(`${apiUrl}/api/image/${imageId}`, { signal });

  if (!response.ok) {
    throw new Error(`Não foi possível carregar a imagem: ${response.status}`);
  }

  return response.json() as Promise<Image>;
}
