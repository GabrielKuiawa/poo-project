import { apiRequest } from "@/lib/api";

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
  token: string;
};

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const body = await apiRequest<LoginResponse>("/api/user/login", {
    method: "POST",
    json: credentials,
    errorMessage: "Não foi possível entrar. Tente novamente em instantes.",
  });

  if (!body.token) {
    throw new Error("A resposta do servidor não contém uma sessão válida.");
  }

  return body;
}
