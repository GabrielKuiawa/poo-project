import { Search } from "lucide-react";
import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";

type AppHeaderProps = {
  userMenu: ReactNode;
};

export function AppHeader({ userMenu }: AppHeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-[68px] z-40 h-16 bg-background/95 px-3 backdrop-blur-sm sm:px-4">
      <div className="flex h-full items-center gap-2">
        <div role="search" className="relative min-w-0 flex-1">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            aria-label="Pesquisar"
            className="h-12 rounded-2xl border-0 bg-muted pr-4 pl-11 text-base shadow-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
            placeholder="Pesquisar"
            readOnly
            type="search"
          />
        </div>

        {userMenu}
      </div>
    </header>
  );
}
