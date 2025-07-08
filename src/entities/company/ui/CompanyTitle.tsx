import noImg from '@/public/images/no-image.png';
import { PiBookmarkSimple, PiBookmarkSimpleFill, PiShare } from 'react-icons/pi';

import { Toggle } from '@/src/widgets/ui/toggle';
import { Button } from '@/src/widgets/ui/button';

import { toast } from '@/src/shared/model/useToast';
import { useToggleBookmarkMutation } from '@/src/shared/api/useToggleBookmarkMutation';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { useCompanyStore } from '@/src/entities/company/model/companyDetail';

import { useState, useEffect } from 'react';

export default function CompanyTitle() {
  const token = useAuthStore((state) => state.token);
  const { isBookmarked, setIsBookmarked, company } = useCompanyStore();
  if (!company) return;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (company) {
      setCount(company.wishCount);
    }
  }, [company]);

  const companyId = company?.id;
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
    <div className="-mt-9 pl-2 relative z-10">
      <div className="flex items-center justify-end w-full px-2 text-2xl font-semibold">
        {/* 왼쪽 영역 */}
        <div className="flex gap-2 mr-auto">
          <img
            src={company.logoUrl || noImg.src}
            alt={`${company.name} 로고`}
            className="w-20 h-20 rounded-md object-contain border border-text-primary bg-white"
          />
          <div className="flex flex-col justify-end">
            <span>{company.name}</span>
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="flex flex-col mt-auto gap-2">
          <div className="flex items-center gap-1 [&_svg]:size-6 bg-transparent">
            <Button
              variant="icon"
              label={<PiShare />}
              className="text-text-primary"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                  toast({ title: '링크가 복사되었습니다.' });
                });
              }}
            />
            {!!token ? (
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
              />
            ) : (
              <PiBookmarkSimple />
            )}
            <span className="text-lg mr-1">{count}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
