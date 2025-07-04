import { useCallback } from 'react';
import { useCompanyStore } from '@/src/shared/lib/company';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { instance as axios } from '@/src/shared/api/axios';
import { useFetchBookmarkStatus } from '@/src/entities/map/api/useFetchBookmarkStatus';

export function useCompanyCardController(companyId: number) {
  const { openCardIndex, setOpenCardIndex, setCompanyInfo, setIsBookmarked } = useCompanyStore();
  const token = useAuthStore((state) => state.token);
  const { bookmarkStatus } = useFetchBookmarkStatus();

  const fetchCompanyDetail = useCallback(async () => {
    const newIndex = openCardIndex === companyId ? null : companyId;
    setOpenCardIndex(newIndex);

    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${companyId}/summary`,
      );
      setCompanyInfo(data.data);
      // console.log("🎀 기업 간단 정보 조회 성공 ", useCompanyStore.getState().companyInfo);

      if (token) {
        // console.log("🎀 저장 여부 기다리는 중...")

        await bookmarkStatus(companyId);
        // console.log("🎀 저장 여부 조회 성공!!")
      } else {
        setIsBookmarked(false);
      }
    } catch (e) {
      console.error('기업 간단 정보 조회 실패: ', e);
    }
  }, [
    openCardIndex,
    companyId,
    setOpenCardIndex,
    setCompanyInfo,
    setIsBookmarked,
    token,
    bookmarkStatus,
  ]);

  return { fetchCompanyDetail };
}
