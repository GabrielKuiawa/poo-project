type TokenPayload = Record<string, unknown> & {
  exp?: number;
};

export function createAuthToken(
  payload: TokenPayload = {
    exp: Math.floor(Date.now() / 1000) + 60,
  },
): string {
  const encodedPayload = window
    .btoa(JSON.stringify(payload))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `header.${encodedPayload}.signature`;
}
