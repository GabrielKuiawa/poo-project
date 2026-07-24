import type { ReactNode } from "react";
import { SearchBar } from "@/features/search/components/SearchBar";

type AppHeaderProps = {
  userMenu: ReactNode;
};

export function AppHeader({ userMenu }: AppHeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-17 z-40 h-16 bg-background/95 px-3 backdrop-blur-sm sm:px-4">
      <div className="flex h-full items-center gap-2">
        <SearchBar />

        {userMenu}
      </div>
    </header>
  );
}
