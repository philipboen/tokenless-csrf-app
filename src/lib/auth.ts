import type { ApiResponse } from "@/lib/ky";

import { authApi } from "@/lib/ky";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Called once at app boot to hydrate auth state from the server
export async function getAuthState(): Promise<AuthState> {
  try {
    const response = await authApi.get("me").json<ApiResponse<User>>();
    return { user: response.data, isAuthenticated: true };
  } catch {
    return { user: null, isAuthenticated: false };
  }
}
