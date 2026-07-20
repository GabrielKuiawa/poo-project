import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { saveAuthToken } from "@/lib/authTokenStorage";
import { authService } from "../services/authService";

export function useLoginMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: async ({ token }) => {
      saveAuthToken(token);
      await navigate({ to: "/" });
    },
  });
}
