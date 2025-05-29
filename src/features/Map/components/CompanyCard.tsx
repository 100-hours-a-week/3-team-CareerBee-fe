import { PiBookmarkSimple, PiBookmarkSimpleFill, PiX } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import noImg from '@/static/no-image.png';
import companyCardBackground from '@/features/Map/image/company-card-background.png';
import { useState, useEffect } from 'react';
import { useToggleBookmarkMutation } from '@/hooks/useToggleBookmarkMutation';
import { toast } from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import cn from 'clsx';

interface CompanyCardProps {
  companyId: number;
  companyName: string;
  bookmarkCount: number;
  tags: string[];
  imageUrl?: string | null;
  noBackgroundImg?: boolean;
  onClose?: () => void;
  isLoggedIn: boolean;
  onToggleBookmark?: () => Promise<boolean>;
  isBookmarked?: boolean;
  setIsBookmarked: (_val: boolean) => void;
  isCompanyCardList?: boolean;
}

export default function CompanyCard({
  companyId,
  companyName,
  bookmarkCount,
  tags,
  imageUrl,
  noBackgroundImg = false,
  onClose,
  isLoggedIn,
  isBookmarked,
  setIsBookmarked,
  isCompanyCardList = false,
}: CompanyCardProps) {
  const [count, setCount] = useState(bookmarkCount);
  const navigate = useNavigate();

  useEffect(() => {
    setCount(bookmarkCount);
  }, [bookmarkCount]);

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

  const handleClickAnywhere = (e: React.MouseEvent<HTMLDivElement>) => {
    // 북마크 토글, X 버튼 클릭한 경우엔 무시
    const target = e.target as HTMLElement;
    if (
      target.closest('button') || // 닫기, 북마크 버튼
      target.closest('svg') // 아이콘
    ) {
      return;
    }
    navigate(`/company/${companyId}`);
  };

  return (
    <div
      role="button"
      onClick={handleClickAnywhere}
      className={cn(
        'relative rounded-xl p-2 w-64 h-44 z-30 cursor-default bg-no-repeat bg-cover',
        isCompanyCardList ? 'bg-white border border-border' : '',
      )}
      style={!isCompanyCardList ? { backgroundImage: `url(${companyCardBackground})` } : {}}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-md font-bold hover:text-text-primary truncate break-all">
          {companyName}
        </p>
        <div className="flex items-center gap-1 [&_svg]:size-5 bg-transparent">
          {isLoggedIn ? (
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
          <span className="text-sm mr-1">{count}</span>
          {isCompanyCardList ? (
            <></>
          ) : (
            <Button variant="icon" label={<PiX />} onClick={onClose} className="p-0 h-full" />
          )}
        </div>
      </div>

      <div className="flex items-center">
        {/* 이미지 */}
        <div className="w-[108px] h-[108px] rounded-md flex items-center justify-center overflow-hidden mr-auto">
          <img
            src={imageUrl || noImg}
            alt={companyName}
            className="w-full h-full object-cover rounded-md"
            onError={(e) => {
              e.currentTarget.onerror = null; // prevent infinite loop
              e.currentTarget.src = noImg;
            }}
          />
        </div>

        {/* 태그들 */}
        <div className="flex flex-col flex-wrap gap-1">
          {tags.map((tag, i) => (
            <div
              key={i}
              className="bg-secondary text-black text-xs px-2 py-1 rounded-full w-[124px] truncate"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
