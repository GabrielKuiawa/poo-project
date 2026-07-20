import { ApiError, apiRequest } from "@/lib/api";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegistrationData = {
  name: string;
  email: string;
  password: string;
  pathImageUser: string;
};

type LoginResponse = {
  message: string;
  token: string;
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

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const body = await apiRequest<LoginResponse>("/api/user/login", {
      method: "POST",
      json: credentials,
      errorMessage: "Não foi possível entrar. Tente novamente em instantes.",
    });

    if (!body.token) {
      throw new Error("A resposta do servidor não contém uma sessão válida.");
    }

    return body;
  },

  register(registrationData: RegistrationData): Promise<RegistrationResponse> {
    return apiRequest<RegistrationResponse>("/api/user", {
      method: "POST",
      json: registrationData,
      errorMessage:
        "Não foi possível criar sua conta. Tente novamente em instantes.",
    });
  },

  async validateSession(token: string): Promise<boolean> {
    try {
      await apiRequest<unknown>("/api/user/me", {
        token,
        errorMessage: "Não foi possível validar sua sessão.",
        useServerErrorMessage: false,
      });
    } catch (error) {
      if (error instanceof ApiError && [401, 403].includes(error.status)) {
        return false;
      }

      throw error;
    }

    return true;
  },
};
