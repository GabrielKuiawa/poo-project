import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { Brand } from "@/components/shared/Brand";

export function AppSidebar() {
  return (
    <aside
      aria-label="Barra lateral"
      className="fixed inset-y-0 left-0 z-50 flex w-17 flex-col items-center border-r bg-background"
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
          to="/feed"
          aria-current="page"
          aria-label="Início"
          className="flex size-11 items-center justify-center rounded-xl bg-foreground text-background outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
          title="Início"
        >
          <Home aria-hidden="true" className="size-5.5" strokeWidth={2.2} />
        </Link>
      </nav>
    </aside>
  );
}
