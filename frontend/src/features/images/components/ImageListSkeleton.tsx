import { MasonryGrid } from "./MasonryGrid";

type ImageListSkeletonProps = {
  count?: number;
};

export function ImageListSkeleton({ count = 20 }: ImageListSkeletonProps) {
  return (
    <div aria-label="Carregando imagens">
      <MasonryGrid images={[]} skeletonCount={count} busy />
    </div>
  );
}
