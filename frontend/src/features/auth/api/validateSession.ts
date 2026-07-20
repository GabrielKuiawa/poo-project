import { apiUrl } from "@/lib/api";

export async function validateSession(token: string): Promise<boolean> {
  const response = await fetch(`${apiUrl}/api/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401 || response.status === 403) {
    return false;
  }

  if (!response.ok) {
    throw new Error("Não foi possível validar sua sessão.");
  }

  return true;
}
