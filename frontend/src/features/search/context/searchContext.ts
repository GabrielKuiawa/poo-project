import { createContext } from "react";
import type { ActiveSearch } from "../types";

export type SearchContextValue = {
  activeSearch: ActiveSearch | null;
  applySearch: (search: ActiveSearch) => void;
  clearSearch: () => void;
};

export const SearchContext = createContext<SearchContextValue | null>(null);
