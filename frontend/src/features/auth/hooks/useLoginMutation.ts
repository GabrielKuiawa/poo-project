import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { saveAuthToken } from "@/lib/authTokenStorage";
import { login } from "../api/login";

export function useLoginMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: async ({ token }) => {
      saveAuthToken(token);
      await navigate({ to: "/" });
    },
  });
}
