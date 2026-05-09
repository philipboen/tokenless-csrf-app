import { create } from "zustand";

import type { User } from "@/lib/auth";
import type { ApiResponse } from "@/lib/ky";

import { authApi } from "@/lib/ky";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthStore extends AuthState {
  isLoading: boolean;
  setAuth: (partial: Partial<AuthStore>) => void;
  fetchAuthState: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  // Tracks initial auth check on app boot
  isLoading: true,
  setAuth: (partial) => set(partial),

  fetchAuthState: async () => {
    set({ isLoading: true });
    try {
      const response = await authApi.get("me").json<ApiResponse<User>>();
      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  logout: async () => {
    try {
      await authApi.post("logout");
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
