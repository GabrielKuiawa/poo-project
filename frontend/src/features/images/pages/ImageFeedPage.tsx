import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { PageFeedback } from "@/components/shared/PageFeedback";
import { ImageList } from "../components/ImageList";
import { ImageListSkeleton } from "../components/ImageListSkeleton";
import { imageService, initialImagesPage } from "../services/imageService";

export function ImageFeedPage() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["images"],
    initialPageParam: initialImagesPage,
    queryFn: ({ pageParam, signal }) => imageService.getPage(pageParam, signal),
    getNextPageParam: (lastPage) => lastPage.meta.next ?? undefined,
  });

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isPending) {
    return <ImageListSkeleton />;
  }

  if (isError) {
    return <PageFeedback variant="error">{error.message}</PageFeedback>;
  }

  const images = data.pages.flatMap((page) => page.data);

  return (
    <>
      <ImageList images={images} isLoadingMore={isFetchingNextPage} />
      {hasNextPage && (
        <div ref={loadMoreRef} aria-hidden="true" className="h-px w-full" />
      )}
    </>
  );
}
