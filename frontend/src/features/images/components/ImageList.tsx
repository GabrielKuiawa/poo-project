import { ImageCard } from "./ImageCard";
import type { Image } from "../types";

type ImageListProps = {
  images: Image[];
};

export function ImageList({ images }: ImageListProps) {
  return (
    <ul className="min-h-screen w-full columns-[230px] list-none gap-4 px-4 py-3">
      {images.map((image) => (
        <li key={image.id} className="mb-5 break-inside-avoid">
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
}