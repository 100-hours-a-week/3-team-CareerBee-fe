import { useAuthStore } from '@/src/entities/auth/model/auth';
import { useCompanyStore } from '@/src/shared/lib/company';
import { instance as axios } from '@/src/shared/api/axios';
import { useCallback } from 'react';

export function useFetchBookmarkStatus() {
  const token = useAuthStore((state) => state.token);
  const { setIsBookmarked } = useCompanyStore();

  const bookmarkStatus = useCallback(
    async (companyId: number, setter?: (_value: boolean) => void) => {
      if (!token) {
        if (setter) setter(false);
        else setIsBookmarked(false);
        return;
      }

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/members/wish-companies/${companyId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        // console.log("🎀 저장 여부 조회 성공!", value)
        if (setter) setter(data.data.isWish);
        else setIsBookmarked(data.data.isWish);
      } catch (err) {
        console.error('관심기업 여부 조회 실패:', err);
      }
    },
    [token, setIsBookmarked],
  );

  return { bookmarkStatus };
}
