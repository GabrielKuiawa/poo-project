import type { ImagePage } from "../types";
import { getAuthToken } from "@/features/auth/authStorage";
import { apiUrl } from "@/lib/api";

const minimumLoadingTime = 700;

export const firstImagesPage = `${apiUrl}/api/image?page=1&limit=20`;

function waitForMinimumLoadingTime(signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const handleAbort = () => {
      window.clearTimeout(timeout);
      reject(new DOMException("A requisição foi cancelada.", "AbortError"));
    };

    const timeout = window.setTimeout(() => {
      signal?.removeEventListener("abort", handleAbort);
      resolve();
    }, minimumLoadingTime);

    if (signal?.aborted) {
      handleAbort();
      return;
    }

    signal?.addEventListener("abort", handleAbort, { once: true });
  });
}

export async function getImages(
  pageUrl: string,
  signal?: AbortSignal,
): Promise<ImagePage> {
  const token = getAuthToken();
  const [response] = await Promise.all([
    fetch(pageUrl, {
      signal,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }),
    waitForMinimumLoadingTime(signal),
  ]);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Sua sessão expirou. Entre novamente.");
    }

    throw new Error(`Não foi possível carregar as imagens: ${response.status}`);
  }

  return response.json() as Promise<ImagePage>;
}
