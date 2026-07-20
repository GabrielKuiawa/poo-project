import { ChevronDown, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUserQuery } from "../hooks/useCurrentUserQuery";

type UserMenuProps = {
  onLogout: () => void;
};

function getUserInitial(name?: string): string {
  return name?.trim().charAt(0).toUpperCase() || "U";
}

export function UserMenu({ onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: user, isError, isPending } = useCurrentUserQuery(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <Button
        type="button"
        variant="ghost"
        className="h-11 gap-1 px-1.5"
        aria-label="Abrir menu do usuário"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="user-menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <Avatar className="size-9">
          <AvatarImage src={user?.pathImageUser} alt="" />
          <AvatarFallback className="bg-slate-500 text-sm text-white">
            {getUserInitial(user?.name)}
          </AvatarFallback>
        </Avatar>
        <ChevronDown
          aria-hidden="true"
          className={`size-4 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {isOpen && (
        <div
          id="user-menu"
          role="dialog"
          aria-label="Menu do usuário"
          className="absolute top-[calc(100%+0.5rem)] right-0 z-50 w-72 rounded-2xl border bg-popover p-2 text-popover-foreground shadow-xl"
        >
          <p className="px-3 pt-2 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Conta
          </p>

          {isPending && (
            <div
              aria-label="Carregando usuário"
              className="flex items-center gap-3 px-3 py-3"
            >
              <Skeleton className="size-11 shrink-0 rounded-full" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          )}

          {isError && (
            <p role="alert" className="px-3 py-3 text-sm text-destructive">
              Não foi possível carregar seu perfil.
            </p>
          )}

          {user && (
            <div className="flex items-center gap-3 px-3 py-3">
              <Avatar className="size-11">
                <AvatarImage src={user.pathImageUser} alt="" />
                <AvatarFallback>{getUserInitial(user.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          <div className="my-1 border-t" />

          <Button
            type="button"
            variant="ghost"
            className="w-full justify-start rounded-xl px-3"
            onClick={onLogout}
          >
            <LogOut aria-hidden="true" />
            Sair
          </Button>
        </div>
      )}
    </div>
  );
}
