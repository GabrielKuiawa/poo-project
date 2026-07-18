import { Skeleton } from "@/components/ui/skeleton";

const skeletonColors = [
  "bg-muted",
  "bg-secondary",
  "bg-accent",
  "bg-primary/15",
];

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
      className={`w-full ${skeletonColors[index % skeletonColors.length]}`}
      style={{ height: getSkeletonHeight(index) }}
    />
  );
}
