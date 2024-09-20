import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: sessionStorage.getItem("accessToken"),

  setAccessToken: (accessToken) => {
    sessionStorage.setItem("accessToken", accessToken);
    set({ accessToken });
  },

  clearTokens: () => {
    sessionStorage.removeItem("accessToken");
    set({ accessToken: null });
  },
}));
