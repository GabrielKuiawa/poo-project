import type { ImagePage } from "../types";

const apiUrl = (
  import.meta.env.VITE_API_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

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
  const [response] = await Promise.all([
    fetch(pageUrl, { signal }),
    waitForMinimumLoadingTime(signal),
  ]);

  if (!response.ok) {
    throw new Error(`Não foi possível carregar as imagens: ${response.status}`);
  }

  return response.json() as Promise<ImagePage>;
}
