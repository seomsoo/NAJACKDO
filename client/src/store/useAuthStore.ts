import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: sessionStorage.getItem("accessToken"),
  refreshToken: sessionStorage.getItem("refreshToken"),

  setAccessToken: (accessToken) => {
    sessionStorage.setItem("accessToken", accessToken);
  },

  setRefreshToken: (refreshToken) => {
    sessionStorage.setItem("refreshToken", refreshToken);
  },

  clearTokens: () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    set({ accessToken: null, refreshToken: null });
  },
}));
