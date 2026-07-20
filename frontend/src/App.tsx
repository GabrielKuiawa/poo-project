import { useInfiniteQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Images, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./components/ui/button";
import {
  clearAuthToken,
  isAuthenticated,
} from "./features/auth/authStorage";
import {
  firstImagesPage,
  getImages,
} from "./features/images/api/getImages";
import { ImageList } from "./features/images/components/ImageList";
import { ImageListSkeleton } from "./features/images/components/ImageListSkeleton";
import type { Image } from "./features/images/types";

const firstPageOrder = [0, 7, 14, 3, 10, 17, 5, 12, 19, 1, 8, 15, 4, 11, 18, 2, 9, 16, 6, 13];

function reorderFirstPage(images: Image[]): Image[] {
  const reorderedImages = firstPageOrder
    .map((index) => images[index])
    .filter((image): image is Image => image !== undefined);
  const reorderedIds = new Set(reorderedImages.map((image) => image.id));

  return [
    ...reorderedImages,
    ...images.filter((image) => !reorderedIds.has(image.id)),
  ];
}

function App() {
  const navigate = useNavigate();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [authenticated, setAuthenticated] = useState(isAuthenticated);
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

  const images = data.pages.flatMap((page, pageIndex) =>
    pageIndex === 0 ? reorderFirstPage(page.data) : page.data,
  );

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-black/5 bg-background/85 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-2.5 font-bold">
            <span className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background">
              <Images size={18} />
            </span>
            <span className="hidden sm:inline">mood board</span>
          </Link>

          {authenticated ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                clearAuthToken();
                setAuthenticated(false);
                void navigate({ to: "/login" });
              }}
            >
              <LogOut size={17} />
              Sair
            </Button>
          ) : (
            <Button asChild>
              <Link to="/login">Entrar</Link>
            </Button>
          )}
        </div>
      </header>
      <ImageList images={images} isLoadingMore={isFetchingNextPage} />
      {hasNextPage && (
        <div ref={loadMoreRef} aria-hidden="true" className="h-px w-full" />
      )}
    </>
  );
}

export default App;
