import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/authService";

export const currentUserQueryKey = ["auth", "current-user"] as const;

export function useCurrentUserQuery(enabled: boolean) {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: ({ signal }) => authService.getCurrentUser(signal),
    enabled,
    gcTime: 0,
  });
}
