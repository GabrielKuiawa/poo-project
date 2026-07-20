const authTokenKey = "mood-board.auth-token";

type TokenPayload = {
  exp?: number;
};

function getTokenPayload(token: string): TokenPayload | null {
  try {
    const encodedPayload = token.split(".")[1];
    if (!encodedPayload) return null;

    const normalizedPayload = encodedPayload
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const paddedPayload = normalizedPayload.padEnd(
      Math.ceil(normalizedPayload.length / 4) * 4,
      "=",
    );

    return JSON.parse(window.atob(paddedPayload)) as TokenPayload;
  } catch {
    return null;
  }
}

export function saveAuthToken(token: string): void {
  window.localStorage.setItem(authTokenKey, token);
}

export function clearAuthToken(): void {
  window.localStorage.removeItem(authTokenKey);
}

export function getAuthToken(): string | null {
  const token = window.localStorage.getItem(authTokenKey);
  if (!token) return null;

  const payload = getTokenPayload(token);
  const isExpired =
    typeof payload?.exp === "number" && payload.exp * 1000 <= Date.now();

  if (!payload || isExpired) {
    clearAuthToken();
    return null;
  }

  return token;
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}
