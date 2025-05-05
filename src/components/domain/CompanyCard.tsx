import { PiBookmarkSimple, PiX } from "react-icons/pi";
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"

interface CompanyCardProps {
  companyName: string
  bookmarkCount: number
  tags: string[]
  imageUrl?: string
  onClose: () => void
  onToggleBookmark?: () => void
  isBookmarked?: 'true' | 'false' | 'disabled'
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
    <div className="relative rounded-2xl bg-white p-3 w-[260px] shadow-md">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-sm line-clamp-1 mr-1">{companyName}</h2>
        <div className="flex items-center gap-1">
          <Toggle 
          variant="save" 
          label={<PiBookmarkSimple className="iconSize-default bg-transparent" />}
          pressed={isBookmarked === 'true'} 
          onPressedChange={onToggleBookmark} />
            
          <span className="text-xs ml-1">{bookmarkCount}</span>
          <Button variant="icon" label={<PiX/>} onClick={onClose} 
            className="px-0" />
        </div>
      </div>

      {/* 이미지 */}
      <div className="w-full h-[80px] rounded-md bg-muted flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={companyName} className="w-full h-full object-cover rounded-md" />
        ) : (
          <span className="text-muted-foreground text-xs">No Image</span>
        )}
      </div>

      {/* 태그들 */}
      <div className="mt-3 flex flex-wrap gap-1">
        {tags.slice(0, 4).map((tag, i) => (
          <div
            key={i}
            className="bg-[#F6C603] text-black text-xs px-2 py-1 rounded-full max-w-full truncate"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  )
}
