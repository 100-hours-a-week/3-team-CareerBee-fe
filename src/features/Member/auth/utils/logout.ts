import { instance as axios } from '@/features/Member/auth/utils/axios';
import { useAuthStore } from '@/features/Member/auth/store/auth';
import { useCompetitionStore } from '@/features/Competition/store/competitionStore';
import { queryClient } from '@/lib/react-query-client';

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
    useCompetitionStore.getState().clearCompetition?.();
    queryClient.removeQueries({ queryKey: ['userInfo'] });
    window.location.href = '/';
  } catch (error) {
    console.error('로그아웃 실패:', error);
  }
};
