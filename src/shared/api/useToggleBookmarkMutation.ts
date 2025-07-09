import { useMutation } from '@tanstack/react-query';
import { instance as axios } from '@/src/shared/api/axios';
import { useAuthStore } from '@/src/entities/auth/model/auth';

export const useToggleBookmarkMutation = ({
  companyId,
  isBookmarked,
  setIsBookmarked,
  onSuccess,
  onError,
}: {
  companyId: number;
  isBookmarked?: boolean;
  setIsBookmarked: (_val: boolean) => void;
  onSuccess?: (_next: boolean) => void;
  onError?: () => void;
}) => {
  const handleToggleBookmark = async () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
      const next = !isBookmarked;
      setIsBookmarked(next);
      return next;
    }
    const token = useAuthStore.getState().token;

    if (!token) throw new Error('No token');

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/members/wish-companies/${companyId}`;

    try {
      const next = !isBookmarked;
      if (isBookmarked) {
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(url, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setIsBookmarked(next);
      return next;
    } catch (err) {
      console.error('북마크 토글 실패', err);
      throw err;
    }
  };

  return useMutation({
    mutationFn: handleToggleBookmark,
    onSuccess: (result) => {
      onSuccess?.(result);
    },
    onError: () => {
      onError?.();
    },
  });
};
