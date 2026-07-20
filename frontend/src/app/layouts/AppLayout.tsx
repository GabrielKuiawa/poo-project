import { Outlet } from "@tanstack/react-router";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { AppHeader } from "@/features/navigation/components/AppHeader";
import { AppSidebar } from "@/features/navigation/components/AppSidebar";

export function AppLayout() {
  const logout = useLogout();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar onLogout={logout} />
      <AppHeader userMenu={<UserMenu onLogout={logout} />} />

      <div className="min-h-screen pt-16 pl-[68px]">
        <Outlet />
      </div>
    </div>
  );
}
