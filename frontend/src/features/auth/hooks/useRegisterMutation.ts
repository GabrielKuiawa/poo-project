import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { saveAuthToken } from "@/lib/authTokenStorage";
import { login } from "../api/login";
import { register } from "../api/register";
import type { RegistrationData } from "../api/register";

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

      await register(normalizedData);

      return login({
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
