import { apiRequest } from "@/lib/api";

export type RegistrationData = {
  name: string;
  email: string;
  password: string;
  pathImageUser: string;
};

type RegistrationResponse = {
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    pathImageUser: string;
    role: string;
  };
};

export async function register(
  registrationData: RegistrationData,
): Promise<RegistrationResponse> {
  return apiRequest<RegistrationResponse>("/api/user", {
    method: "POST",
    json: registrationData,
    errorMessage:
      "Não foi possível criar sua conta. Tente novamente em instantes.",
  });
}
