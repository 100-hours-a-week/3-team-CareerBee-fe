import { useAuthStore } from '@/store/auth';
import { useCompanyStore } from '@/store/company';
import { instance as axios } from '@/lib/axios';
import { useCallback } from 'react';

export function useFetchBookmarkStatus() {
  const token = useAuthStore((state) => state.token);
  const { setIsBookmarked } = useCompanyStore();

  const bookmarkStatus = useCallback(
    async (
    companyId: number,
    setter?: (value: 'true' | 'false' | 'disabled') => void
  ) => {
    if (!token) {
      if (setter) setter('disabled');
      else setIsBookmarked('disabled');
      return;
    }

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/members/wish-companies/${companyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      const value = data.data.isWish ? 'true' : 'false';
      // console.log("🎀 저장 여부 조회 성공!", value)
      if (setter) setter(value);
      else setIsBookmarked(value);
    } catch (err) {
      console.error('관심기업 여부 조회 실패:', err);
    }
  },[token]
);

  return { bookmarkStatus };
}