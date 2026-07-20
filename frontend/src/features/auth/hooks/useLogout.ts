import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { clearAuthToken } from "@/lib/authTokenStorage";

export function useLogout() {
  const navigate = useNavigate();

  return useCallback(() => {
    clearAuthToken();
    void navigate({ to: "/login" });
  }, [navigate]);
}
