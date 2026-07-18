import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Image } from "../types";
import { ImageCard } from "./ImageCard";
import { ImageCardSkeleton } from "./ImageCardSkeleton";

const minimumColumnWidth = 230;
const columnGap = 16;

type MasonryGridProps = {
  images: Image[];
  skeletonCount?: number;
  busy?: boolean;
};

type MasonryItem = {
  key: string;
  content: ReactNode;
};

function getColumnCount(containerWidth: number): number {
  return Math.max(
    1,
    Math.floor((containerWidth + columnGap) / (minimumColumnWidth + columnGap)),
  );
}

export function MasonryGrid({
  images,
  skeletonCount = 0,
  busy = false,
}: MasonryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(1);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const updateColumnCount = (width: number) => {
      setColumnCount(getColumnCount(width));
    };

    updateColumnCount(grid.clientWidth);

    const resizeObserver = new ResizeObserver(([entry]) => {
      updateColumnCount(entry.contentRect.width);
    });

    resizeObserver.observe(grid);
    return () => resizeObserver.disconnect();
  }, []);

  const columns = useMemo(() => {
    const items: MasonryItem[] = [
      ...images.map((image) => ({
        key: image.id,
        content: <ImageCard image={image} />,
      })),
      ...Array.from({ length: skeletonCount }, (_, index) => ({
        key: `skeleton-${images.length + index}`,
        content: <ImageCardSkeleton index={images.length + index} />,
      })),
    ];
    const nextColumns = Array.from(
      { length: columnCount },
      () => [] as MasonryItem[],
    );

    items.forEach((item, index) => {
      nextColumns[index % columnCount].push(item);
    });

    return nextColumns;
  }, [columnCount, images, skeletonCount]);

  return (
    <div className="w-full px-4 py-3">
      <div
        ref={gridRef}
        aria-busy={busy}
        className="grid w-full items-start gap-4"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        }}
      >
        {columns.map((column, columnIndex) => (
          <ul
            key={columnIndex}
            className="flex min-w-0 list-none flex-col gap-5"
          >
            {column.map((item) => (
              <li key={item.key} className="min-w-0">
                {item.content}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
