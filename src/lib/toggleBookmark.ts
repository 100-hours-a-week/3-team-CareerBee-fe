//특정 회사의 저장 여부 get & 저장하면 post 날리기

import { instance as axios } from '@/features/Member/lib/axios';

export const handleToggleBookmark = async (
  token: string,
  companyId: number,
  isBookmarked: boolean,
  setIsBookmarked: (_value: boolean) => void,
) => {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    console.warn('[mock] toggleBookmark 작동 중');

    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const next = !isBookmarked;
        setIsBookmarked(next);
        resolve(next);
        // console.log('🎀', next);
        // return next;
      }, 300);
    });
  }

  if (!token) return;

  const url = `${import.meta.env.VITE_API_URL}/api/v1/members/wish-companies/${companyId}`;

  try {
    if (isBookmarked === true) {
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsBookmarked(false);
      return false;
    } else {
      await axios.post(url, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsBookmarked(true);
      return true;
    }
  } catch (error) {
    console.error('관심기업 토글 실패:', error);
    // throw error;
    return null;
  }
};
