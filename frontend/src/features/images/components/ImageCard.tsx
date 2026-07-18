import { useState } from "react";
import type { Image } from "../types";
import { getPlaceholderColor } from "../placeholderColors";

type ImageCardProps = {
  image: Image;
  index: number;
};

export function ImageCard({ image, index }: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <article
      className="overflow-hidden rounded-2xl"
      style={{ backgroundColor: getPlaceholderColor(index) }}
    >
      <img
        className={`block h-auto min-h-37.5 max-h-130 w-full object-cover transition-opacity duration-500 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={image.pathImage}
        alt={image.description}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </article>
  );
}
