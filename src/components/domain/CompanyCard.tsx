import { PiBookmarkSimple, PiBookmarkSimpleFill, PiX } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import noImg from '@/assets/no-image.png';
import companyCardBackground from '@/assets/company-card-background.png';
import { useState, useEffect } from 'react';

interface CompanyCardProps {
  companyId: number;
  companyName: string;
  bookmarkCount: number;
  tags: string[];
  imageUrl?: string | null;
  onClose: () => void;
  onToggleBookmark?: () => void;
  isBookmarked?: 'true' | 'false' | 'disabled';
}

export default function CompanyCard({
  companyId,
  companyName,
  bookmarkCount,
  tags,
  imageUrl,
  onClose,
  onToggleBookmark,
  isBookmarked,
}: CompanyCardProps) {
  const [count, setCount] = useState(bookmarkCount);

  useEffect(() => {
    setCount(bookmarkCount);
  }, [bookmarkCount]);
  return (
    <div 
    style={{
      backgroundImage: `url(${companyCardBackground})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '256px',
      height: '176px',
    }}
    className="relative rounded-xl p-2 w-64 h-44  cursor-default">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-2">
        <a
            href={`/company/${companyId}`}
            className="text-md font-bold hover:text-text-primary truncate break-all "
        >
            {companyName}
        </a>
        <div className="flex items-center gap-1 [&_svg]:size-5 bg-transparent">
            {isBookmarked === 'disabled' ? (
                <PiBookmarkSimple />
            ) : (
                <Toggle
                    variant="save"
                    size="xs"
                    label={
                      isBookmarked === 'true' ? (
                        <PiBookmarkSimpleFill className="text-primary" />
                      ) : (
                        <PiBookmarkSimple />
                      )
                    }
                    pressed={isBookmarked === 'true'}
                    onPressedChange={() => {
                      if (onToggleBookmark) {
                        onToggleBookmark();
                        setCount(prev => isBookmarked === 'true' ? prev - 1 : prev + 1);
                      }
                    }}
                />
            )}
          <span className="text-sm mr-1">{count}</span>
          <Button variant="icon" label={<PiX />} onClick={onClose} className="p-0 h-full" />
        </div>
      </div>

      <div className="flex items-center">
        {/* 이미지 */}
        <div className="w-[108px] h-[108px] rounded-md flex items-center justify-center overflow-hidden mr-auto">
            <img
              src={imageUrl ? imageUrl : noImg}
              alt={companyName}
              className="w-full h-full object-cover rounded-md"
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
