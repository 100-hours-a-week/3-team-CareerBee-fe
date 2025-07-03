// src/hooks/useUserInfo.ts
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/src/features/member/api/getUserInfo';
import { useAuthStore } from '@/src/entities/auth/model/auth';

export const useUserInfo = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: () => {
      if (!token) throw new Error('No token found');
      return getUserInfo(token);
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 10, // 10분
  });
};
