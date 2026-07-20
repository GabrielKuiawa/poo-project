const apiUrl = (
  import.meta.env.VITE_API_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
  token: string;
};

type ErrorResponse = {
  message?: string;
};

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const response = await fetch(`${apiUrl}/api/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const body = (await response.json().catch(() => ({}))) as
    | LoginResponse
    | ErrorResponse;

  if (!response.ok) {
    throw new Error(
      body.message ?? "Não foi possível entrar. Tente novamente em instantes.",
    );
  }

  if (!("token" in body) || !body.token) {
    throw new Error("A resposta do servidor não contém uma sessão válida.");
  }

  return body;
}
