import type { Image } from "../types";

type ImageCardProps = {
  image: Image;
};

export function ImageCard({ image }: ImageCardProps) {
  return (
    <article>
      <img
        className="block h-auto min-h-37.5 max-h-130 w-full rounded-2xl object-cover"
        src={image.pathImage}
        // alt={image.description}
        loading="lazy"
      />
    </article>
  );
}
