import { useCallback } from 'react';
import { useCompanyStore } from '@/store/company';
import { useAuthStore } from '@/store/auth';
import { instance as axios } from '@/lib/axios';

export function useCompanyDetail(companyId: number, index: number) {
  const {
    openCardIndex,
    setOpenCardIndex,
    setCompanyInfo,
    setIsBookmarked,
  } = useCompanyStore();
  const token = useAuthStore((state) => state.token);

  const fetchCompanyDetail = useCallback(async () => {
    const newIndex = openCardIndex === index ? null : index;
    setOpenCardIndex(newIndex);

    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/companies/${companyId}/summary`);
      setCompanyInfo(data.data);

      if (token) {
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/v1/members/wish-companies/${companyId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setIsBookmarked(res.data.data.isWish ? 'true' : 'false');
          })
          .catch((err) => {
            console.error('관심기업 여부 조회 실패:', err);
          });
      } else {
        setIsBookmarked('disabled');
      }
    } catch (e) {
      console.error('기업 간단 정보 조회 실패: ', e);
    }
  }, [openCardIndex, index, companyId, setOpenCardIndex, setCompanyInfo, setIsBookmarked, token]);

  return { fetchCompanyDetail };
}
