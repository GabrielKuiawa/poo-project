import { Outlet } from "@tanstack/react-router";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { AppHeader } from "@/features/navigation/components/AppHeader";
import { AppSidebar } from "@/features/navigation/components/AppSidebar";
import { SearchProvider } from "@/features/search/context/SearchProvider";

export function AppLayout() {
  const logout = useLogout();

  return (
    <SearchProvider>
      <div className="min-h-screen bg-background">
        <AppSidebar />
        <AppHeader userMenu={<UserMenu onLogout={logout} />} />

        <div className="min-h-screen pt-16 pl-17">
          <Outlet />
        </div>
      </div>
    </SearchProvider>
  );
}
