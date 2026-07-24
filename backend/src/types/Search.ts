export const searchTargetTypes = ["image", "category", "user"] as const;

export type SearchTargetType = (typeof searchTargetTypes)[number];

export type SearchTarget = {
  type: SearchTargetType;
  id: string;
};

export type ImageSearchFilters = {
  query?: string;
  target?: SearchTarget;
};

export type SearchSuggestion = {
  type: SearchTargetType;
  id: string;
  label: string;
  subtitle: string;
  imageUrl?: string;
};
