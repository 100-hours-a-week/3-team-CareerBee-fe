'use client';

import { safeDelete } from '@/src/shared/api/request';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { queryClient } from '@/src/shared/lib/react-query-client';

export const handleQuit = async (selectedReason: string) => {
  const token = useAuthStore((state) => state.token);

  try {
    await safeDelete(
      '/api/v1/members',
      {
        data: {
          withdrawReason: selectedReason,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    //탈퇴 성공
    useAuthStore.getState().clearToken();
    queryClient.removeQueries({ queryKey: ['userInfo'] });
    window.location.href = '/';
  } catch (error) {
    console.error('회원 탈퇴 실패:', error);
  }
};

export default handleQuit;