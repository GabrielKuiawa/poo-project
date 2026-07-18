import type { Image } from "../types";
import { MasonryGrid } from "./MasonryGrid";

type ImageListProps = {
  images: Image[];
  isLoadingMore?: boolean;
  loadingCount?: number;
};

export function ImageList({
  images,
  isLoadingMore = false,
  loadingCount = 20,
}: ImageListProps) {
  return (
    <MasonryGrid
      images={images}
      skeletonCount={isLoadingMore ? loadingCount : 0}
      busy={isLoadingMore}
    />
  );
}
