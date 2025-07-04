import { instance as axios } from '@/src/shared/api/axios';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { useCompetitionStore } from '@/src/entities/competition/model/competitionStore';
import { queryClient } from '@/src/shared/lib/react-query-client';

export const logout = async () => {
  const token = useAuthStore.getState().token;
  if (!token) return;

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`, null, {
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
