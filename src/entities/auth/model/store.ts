import { create } from "zustand";
import { AuthState } from "./types";

interface AuthStore extends AuthState {
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setUserData: (userId: string, onboarding: boolean) => void;
  setOnboarding: (value: boolean) => void;
  clearUserData: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  userId: undefined,
  onboarding: undefined,
  setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
  setLoading: (value: boolean) => set({ isLoading: value }),
  setUserData: (userId: string, onboarding: boolean) =>
    set({ userId, onboarding }),
  setOnboarding: (value: boolean) => set({ onboarding: value }),
  clearUserData: () => set({ userId: undefined, onboarding: undefined }),
}));
