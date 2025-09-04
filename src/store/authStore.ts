import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  user: { id: string; email: string | undefined } | null;
  loading: boolean;
  login: (userData: { id: string; email: string | undefined }) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      loading: true,
      login: (userData) =>
        set({
          isLoggedIn: true,
          user: userData,
          loading: false,
        }),
      logout: () =>
        set({
          isLoggedIn: false,
          user: null,
          loading: false,
        }),
      setLoading: (isLoading) => set({ loading: isLoading }),
    }),
    { // Best practice is using HTTP-only cookie but this will do for now
      name: 'auth-storage', // key in localStorage
      storage: createJSONStorage(() => localStorage), // defaults to localStorage
    }
  )
);
