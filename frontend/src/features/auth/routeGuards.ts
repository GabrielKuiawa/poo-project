import { isRedirect, redirect } from "@tanstack/react-router";
import {
  clearAuthToken,
  getAuthToken,
} from "./authStorage";
import { validateSession } from "./api/validateSession";

export async function requireAuthenticatedSession(): Promise<void> {
  const token = getAuthToken();

  if (!token) {
    throw redirect({ to: "/login" });
  }

  const isValid = await validateSession(token);
  if (!isValid) {
    clearAuthToken();
    throw redirect({ to: "/login" });
  }
}

export async function redirectAuthenticatedSession(): Promise<void> {
  const token = getAuthToken();
  if (!token) return;

  try {
    if (await validateSession(token)) {
      throw redirect({ to: "/" });
    }

    clearAuthToken();
  } catch (error) {
    if (isRedirect(error)) throw error;

    // Keep the login screen available while the API is temporarily offline.
  }
}
