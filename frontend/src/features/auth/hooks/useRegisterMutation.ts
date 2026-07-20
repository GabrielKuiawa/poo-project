import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { saveAuthToken } from "@/lib/authTokenStorage";
import { authService } from "../services/authService";
import type { RegistrationData } from "../services/authService";

export function useRegisterMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (registrationData: RegistrationData) => {
      const normalizedData = {
        ...registrationData,
        name: registrationData.name.trim(),
        email: registrationData.email.trim(),
        pathImageUser: registrationData.pathImageUser.trim(),
      };

      await authService.register(normalizedData);

      return authService.login({
        email: normalizedData.email,
        password: normalizedData.password,
      });
    },
    onSuccess: async ({ token }) => {
      saveAuthToken(token);
      await navigate({ to: "/" });
    },
  });
}
