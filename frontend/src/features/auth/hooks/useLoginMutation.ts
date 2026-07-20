import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login } from "../api/login";
import { saveAuthToken } from "../authStorage";

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
