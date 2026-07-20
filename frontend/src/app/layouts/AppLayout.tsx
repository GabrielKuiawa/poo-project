import { Outlet } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Brand } from "@/components/shared/Brand";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/useLogout";

export function AppLayout() {
  const logout = useLogout();

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-black/5 bg-background/85 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          <Brand labelClassName="hidden sm:inline" />

          <Button type="button" variant="ghost" onClick={logout}>
            <LogOut size={17} />
            Sair
          </Button>
        </div>
      </header>

      <Outlet />
    </>
  );
}
