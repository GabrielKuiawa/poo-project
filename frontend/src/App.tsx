import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import {
  firstImagesPage,
  getImages,
} from "./features/images/api/getImages";
import { ImageList } from "./features/images/components/ImageList";
import { ImageListSkeleton } from "./features/images/components/ImageListSkeleton";

function App() {
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
    initialPageParam: firstImagesPage,
    queryFn: ({ pageParam, signal }) => getImages(pageParam, signal),
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
    return <p>{error.message}</p>;
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

export default App;
