import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ActiveSearch } from "../types";
import { SearchContext } from "./searchContext";

export function SearchProvider({ children }: { children: ReactNode }) {
  const [activeSearch, setActiveSearch] = useState<ActiveSearch | null>(null);
  const applySearch = useCallback((search: ActiveSearch) => {
    setActiveSearch(search);
  }, []);
  const clearSearch = useCallback(() => {
    setActiveSearch(null);
  }, []);
  const value = useMemo(
    () => ({ activeSearch, applySearch, clearSearch }),
    [activeSearch, applySearch, clearSearch],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
