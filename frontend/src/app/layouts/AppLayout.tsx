import { Outlet, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Brand } from "@/components/shared/Brand";
import { Button } from "@/components/ui/button";
import { clearAuthToken } from "@/features/auth/authStorage";

export function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthToken();
    void navigate({ to: "/login" });
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-black/5 bg-background/85 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          <Brand labelClassName="hidden sm:inline" />

          <Button type="button" variant="ghost" onClick={handleLogout}>
            <LogOut size={17} />
            Sair
          </Button>
        </div>
      </header>

      <Outlet />
    </>
  );
}
