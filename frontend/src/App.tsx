import { useEffect, useState } from "react";
import { getImages } from "./features/images/api/getImages";
import { ImageList } from "./features/images/components/ImageList";
import { ImageListSkeleton } from "./features/images/components/ImageListSkeleton";
import type { Image } from "./features/images/types";
import "./index.css";

const MINIMUM_LOADING_TIME = 700;

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadImages() {
      try {
        const [data] = await Promise.all([
          getImages(controller.signal),
          new Promise((resolve) => setTimeout(resolve, MINIMUM_LOADING_TIME)),
        ]);
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
    return <ImageListSkeleton />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <ImageList images={images} />;
}

export default App;
