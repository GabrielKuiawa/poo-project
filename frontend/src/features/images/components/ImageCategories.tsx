import { Badge } from "@/components/ui/badge";
import type { ImageCategory } from "../types";

type ImageCategoriesProps = {
  categories: ImageCategory[];
};

export function ImageCategories({ categories }: ImageCategoriesProps) {
  if (categories.length === 0) return null;

  return (
    <ul className="flex list-none flex-wrap gap-2 p-0">
      {categories.map((category) => (
        <li key={category.id}>
          <Badge variant="secondary">{category.name}</Badge>
        </li>
      ))}
    </ul>
  );
}
