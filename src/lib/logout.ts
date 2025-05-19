import { instance as axios } from '@/lib/axios';
import { useAuthStore } from "@/store/auth";

export const logout = async () => {
  const token = useAuthStore.getState().token;
  if (!token) return;

  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    useAuthStore.getState().clearToken?.();
    window.location.href = "/";
  } catch (error) {
    console.error("로그아웃 실패:", error);
    
  }
}