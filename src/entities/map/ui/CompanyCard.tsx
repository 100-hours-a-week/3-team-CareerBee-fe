'use client';

import { PiBookmarkSimple, PiBookmarkSimpleFill, PiX } from 'react-icons/pi';
import noImg from '@/public/images/no-image.png';
import companyCardBackground from '@/src/features/map/assets/company-card-background.png';
import { Button } from '@/src/widgets/ui/button';
import { Toggle } from '@/src/widgets/ui/toggle';

import { useToggleBookmarkMutation } from '@/src/shared/api/useToggleBookmarkMutation';
import { toast } from '@/src/shared/model/useToast';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import React from 'react';
import { cn } from '@/src/shared/lib/utils';
import { image } from 'd3';

interface CompanyCardProps {
  companyId: number;
  companyName: string;
  bookmarkCount: number;
  tags: string[];
  imageUrl?: string | null;
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
  onClose,
  isLoggedIn,
  isBookmarked,
  setIsBookmarked,
  isCompanyCardList = false,
}: CompanyCardProps) {
  const [count, setCount] = useState(bookmarkCount);
  const router = useRouter();

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
    router.push(`/company/${companyId}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClickAnywhere}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClickAnywhere(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
      className={cn(
        'relative rounded-xl p-2 w-64 z-30 cursor-pointer bg-no-repeat bg-cover',
        isCompanyCardList ? 'bg-white border border-border h-40' : 'h-44',
      )}
      style={!isCompanyCardList ? { backgroundImage: `url(${companyCardBackground.src})` } : {}}
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
        <div className="relative w-[108px] h-[108px] rounded-md flex items-center justify-center overflow-hidden mr-auto">
          <img
            src={imageUrl || noImg.src}
            alt={companyName}
            // fill
            sizes="(max-width: 640px) 100vw, 108px"
            className="object-cover rounded-md"
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
