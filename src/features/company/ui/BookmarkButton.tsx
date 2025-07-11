'use client';

import { PiBookmarkSimple, PiBookmarkSimpleFill } from 'react-icons/pi';
import { Toggle } from '@/src/widgets/ui/toggle';
import { toast } from '@/src/shared/model/useToast';
import { useAuthStore } from '@/src/entities/auth/model/auth';

import { useFetchBookmarkStatus } from '@/src/shared/api/useFetchBookmarkStatus';
import { fetchWishCount } from '@/src/entities/company/api/fetchWishCount';
import { useToggleBookmarkMutation } from '@/src/shared/api/useToggleBookmarkMutation';

import { useState, useEffect } from 'react';

export const BookmarkButton = ({ companyId }: { companyId: number }) => {
  const token = useAuthStore((state) => state.token);

  const { bookmarkStatus } = useFetchBookmarkStatus();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    bookmarkStatus(companyId, setIsBookmarked);
  }, []);

  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const getWishCount = async () => {
      const count = await fetchWishCount({ companyId: companyId });
      console.log(count);
      setCount(count);
    };
    getWishCount();
  }, []);

  const handleToggleBookmark = useToggleBookmarkMutation({
    companyId,
    isBookmarked,
    setIsBookmarked,
    onSuccess: (next) => {
      setCount((prev) => (next ? prev + 1 : prev - 1));
    },
    onError: () => {
      toast({ title: '북마크 토글 실패' });
    },
  });

  return (
    <>
      {token ? (
        <Toggle
          variant="save"
          size="xs"
          label={
            isBookmarked === true ? (
              <PiBookmarkSimpleFill className="text-primary" />
            ) : (
              <PiBookmarkSimple />
            )
          }
          pressed={isBookmarked === true}
          onPressedChange={() => {
            if (!handleToggleBookmark.isPending) {
              handleToggleBookmark.mutate();
            }
          }}
          disabled={handleToggleBookmark.isPending}
        />
      ) : (
        <PiBookmarkSimple />
      )}
      <span className="text-lg mr-1">{count}</span>
    </>
  );
};

export default BookmarkButton;
