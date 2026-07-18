import { Skeleton } from "@/components/ui/skeleton";

const skeletonColors = [
  "bg-muted",
  "bg-secondary",
  "bg-accent",
  "bg-primary/15",
];

type ImageListSkeletonProps = {
  count?: number;
};

function getSkeletonHeight(index: number) {
  const minimumHeight = 224;
  const heightVariation = (index * 83) % 193;

  return minimumHeight + heightVariation;
}

type ImageCardSkeletonProps = {
  index: number;
};

export function ImageCardSkeleton({ index }: ImageCardSkeletonProps) {
  return (
    <Skeleton
      className={`mb-5 w-full break-inside-avoid ${skeletonColors[index % skeletonColors.length]}`}
      style={{ height: getSkeletonHeight(index) }}
    />
  );
}

export function ImageListSkeleton({ count = 20 }: ImageListSkeletonProps) {
  return (
    <div
      aria-label="Carregando imagens"
      aria-busy="true"
      className="min-h-screen w-full columns-[230px] gap-4 px-4 py-3"
    >
      {Array.from({ length: count }, (_, index) => (
        <ImageCardSkeleton key={index} index={index} />
      ))}
    </div>
  );
}
