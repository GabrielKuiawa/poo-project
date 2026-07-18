import type { Image } from "../types";

const apiUrl = (
  import.meta.env.VITE_API_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export async function getImages(signal?: AbortSignal): Promise<Image[]> {
  const response = await fetch(`${apiUrl}/api/image`, { signal });

  if (!response.ok) {
    throw new Error(`Não foi possível carregar as imagens: ${response.status}`);
  }

  return response.json() as Promise<Image[]>;
}