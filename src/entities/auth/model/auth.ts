import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  setToken: (_token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => {
        sessionStorage.removeItem('auth-storage');
        window.location.reload();
      },
    }),
    {
      name: 'auth-storage', // sessionStorage 키 이름
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
