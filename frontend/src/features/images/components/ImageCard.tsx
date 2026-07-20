import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Upload } from "lucide-react";
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
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/25" />

      <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button
          className="absolute top-3 left-3 z-20 flex cursor-pointer items-center gap-0.5 rounded-full px-2 py-3 text-sm font-semibold text-white"
          type="button"
        >
          Perfil
          <ChevronDown size={16} strokeWidth={2.5} />
        </button>

        <button
          className="absolute top-3 right-3 z-20 cursor-pointer rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          type="button"
        >
          Salvar
        </button>

        <button
          className="absolute right-3 bottom-3 z-20 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-zinc-200"
          type="button"
          aria-label="Compartilhar imagem"
        >
          <Upload size={19} strokeWidth={2.5} />
        </button>
      </div>
    </article>
  );
}
