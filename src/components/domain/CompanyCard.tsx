import { PiBookmarkSimple, PiX } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

interface CompanyCardProps {
  companyName: string;
  bookmarkCount: number;
  tags: string[];
  imageUrl?: string;
  onClose: () => void;
  onToggleBookmark?: () => void;
  isBookmarked?: 'true' | 'false' | 'disabled';
}

export default function CompanyCard({
  companyName,
  bookmarkCount,
  tags,
  imageUrl,
  onClose,
  onToggleBookmark,
  isBookmarked,
}: CompanyCardProps) {
  return (
    <div className="relative rounded-lg border-2 border-border bg-white p-2 w-full h-full shadow-md">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-semibold text-sm line-clamp-1 mr-1">{companyName}</h2>
        <div className="flex items-center gap-1">
            {isBookmarked === 'disabled' ? (null) : (
                <Toggle
                    variant="save"
                    label={<PiBookmarkSimple className="[&_svg]:size-4 bg-transparent" />}
                    pressed={isBookmarked === 'true'}
                    onPressedChange={onToggleBookmark}
                />
            )}
          <span className="text-xs ml-1">{bookmarkCount}</span>
          <Button variant="icon" label={<PiX />} onClick={onClose} className="p-0" />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        {/* 이미지 */}
        <div className="w-[100px] h-[100px] rounded-md bg-muted flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={companyName}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <span className="text-muted-foreground text-xs">No Image</span>
          )}
        </div>

        {/* 태그들 */}
        <div className="mt-1 flex flex-col flex-wrap gap-1">
          {tags.slice(0, 4).map((tag, i) => (
            <div
              key={i}
              className="bg-secondary text-black text-xs px-2 py-1 rounded-full w-[120px] truncate"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
