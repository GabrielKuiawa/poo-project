import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { clearAuthToken } from "../authStorage";

export function useLogout() {
  const navigate = useNavigate();

  return useCallback(() => {
    clearAuthToken();
    void navigate({ to: "/login" });
  }, [navigate]);
}
