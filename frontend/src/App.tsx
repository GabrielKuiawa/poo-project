import { useEffect, useState } from "react";
import { getImages } from "./features/images/api/getImages";
import { ImageList } from "./features/images/components/ImageList";
import type { Image } from "./features/images/types";
import "./index.css";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadImages() {
      try {
        const data = await getImages(controller.signal);
        setImages(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadImages();

    return () => controller.abort();
  }, []);

  if (isLoading) {
    return <p>Carregando imagens...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <ImageList images={images} />;
}

export default App;