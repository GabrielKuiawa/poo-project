import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Image } from "../types";
import { getPlaceholderColor } from "../placeholderColors";
import { ImageCardActions } from "./ImageCardActions";

type ImageCardProps = {
  image: Image;
  index: number;
};

export function ImageCard({ image, index }: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-2xl"
      style={{ backgroundColor: getPlaceholderColor(index) }}
    >
      <Link
        to="/images/$imageId"
        params={{ imageId: image.id }}
        className="absolute inset-0 z-10"
        aria-label={`Ver detalhes de ${image.title}`}
      />
      <img
        className={`block h-auto min-h-60 max-h-130 w-full object-cover transition-opacity duration-500 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={image.pathImage}
        alt={image.description}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-200 group-focus-within:bg-black/25 group-hover:bg-black/25" />

      <ImageCardActions />
    </article>
  );
}
