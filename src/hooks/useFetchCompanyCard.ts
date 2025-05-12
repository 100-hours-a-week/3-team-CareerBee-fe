import { useCallback } from 'react';
import { useCompanyStore } from '@/store/company';
import { useAuthStore } from '@/store/auth';
import { instance as axios } from '@/lib/axios';
import { useFetchBookmarkStatus } from './useFetchBookmarkStatus';

export function useFetchCompanyCard(companyId: number, index: number) {
  const {
    openCardIndex,
    setOpenCardIndex,
    setCompanyInfo,
    setIsBookmarked,
  } = useCompanyStore();
  const token = useAuthStore((state) => state.token);
  const { bookmarkStatus } = useFetchBookmarkStatus();

  const fetchCompanyDetail = useCallback(async () => {
    const newIndex = openCardIndex === companyId ? null : companyId;
    setOpenCardIndex(newIndex);

    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/companies/${companyId}/summary`);
      setCompanyInfo(data.data);
      console.log("🎀 기업 간단 정보 조회 성공 ", useCompanyStore.getState().companyInfo);

      if (token) {
        console.log("🎀 저장 여부 기다리는 중...")

        await bookmarkStatus(companyId);
        console.log("🎀 저장 여부 조회 성공!!")

      } else {
        setIsBookmarked('disabled');
      }
    } catch (e) {
      console.error('기업 간단 정보 조회 실패: ', e);
    }
  }, [openCardIndex, index, companyId, setOpenCardIndex, setCompanyInfo, setIsBookmarked, token, bookmarkStatus]);

  return { fetchCompanyDetail };
}
