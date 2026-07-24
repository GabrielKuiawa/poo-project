import { useContext } from "react";
import {
  SearchContext,
  type SearchContextValue,
} from "../context/searchContext";

export function useSearchContext(): SearchContextValue {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearchContext deve ser usado dentro de SearchProvider");
  }

  return context;
}
