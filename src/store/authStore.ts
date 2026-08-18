import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  profileImage: string;
  fcmtoken: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      login: (user, token) => {
        set({
          user,
          token,
          isLoggedIn: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isLoggedIn: false,
        });
      },
    }),

    {
      name: "auth-storage",

      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;