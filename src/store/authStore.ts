import { create } from "zustand";

type UserData = { id: string; username: string };

type AuthState = {
  accessToken: string | null;
  userData: UserData | null;
  setAccessToken: (token: string | null) => void;
  setUserData: (data: UserData | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  userData: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setUserData: (data) => set({ userData: data }),
}));
