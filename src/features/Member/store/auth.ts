import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => {
        localStorage.removeItem('auth-storage');
        localStorage.removeItem('userPoint');
        localStorage.removeItem('hasNewAlarm');
        set({ token: null });
        window.location.reload();
    }}),
    {
      name: 'auth-storage', // localStorage 키 이름
    },
  ),
);

// export const authStore = useAuthStore;