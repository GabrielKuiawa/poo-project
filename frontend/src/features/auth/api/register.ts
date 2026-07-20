import { apiUrl } from "@/lib/api";

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

type ErrorResponse = {
  message?: string;
};

export async function register(
  registrationData: RegistrationData,
): Promise<RegistrationResponse> {
  const response = await fetch(`${apiUrl}/api/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registrationData),
  });

  const body = (await response.json().catch(() => ({}))) as
    | RegistrationResponse
    | ErrorResponse;

  if (!response.ok) {
    throw new Error(
      body.message ??
        "Não foi possível criar sua conta. Tente novamente em instantes.",
    );
  }

  return body as RegistrationResponse;
}
