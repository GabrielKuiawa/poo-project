import { Link } from "@tanstack/react-router";
import { Home, LogOut } from "lucide-react";
import { Brand } from "@/components/shared/Brand";
import { Button } from "@/components/ui/button";

type AppSidebarProps = {
  onLogout: () => void;
};

export function AppSidebar({ onLogout }: AppSidebarProps) {
  return (
    <aside
      aria-label="Barra lateral"
      className="fixed inset-y-0 left-0 z-50 flex w-[68px] flex-col items-center border-r bg-background"
    >
      <div className="flex h-16 shrink-0 items-center justify-center">
        <Brand
          className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
          labelClassName="sr-only"
          logoClassName="size-8"
        />
      </div>

      <nav aria-label="Navegação principal" className="mt-1">
        <Link
          to="/"
          aria-current="page"
          aria-label="Início"
          className="flex size-11 items-center justify-center rounded-xl bg-foreground text-background outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
          title="Início"
        >
          <Home aria-hidden="true" className="size-[22px]" strokeWidth={2.2} />
        </Link>
      </nav>

      <div className="mt-auto pb-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 rounded-xl"
          aria-label="Sair"
          title="Sair"
          onClick={onLogout}
        >
          <LogOut aria-hidden="true" className="size-[22px]" />
        </Button>
      </div>
    </aside>
  );
}
