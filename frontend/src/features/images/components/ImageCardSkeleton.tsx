import { Skeleton } from "@/components/ui/skeleton";
import { getPlaceholderColor } from "../placeholderColors";

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
      className="w-full"
      style={{
        height: getSkeletonHeight(index),
        backgroundColor: getPlaceholderColor(index),
      }}
    />
  );
}
