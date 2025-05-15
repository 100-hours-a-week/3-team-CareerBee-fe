import { PiBookmarkSimple, PiBookmarkSimpleFill, PiShare } from 'react-icons/pi';
import {Toggle} from '@/components/ui/toggle';
import {Button} from '@/components/ui/button';
import {useState, useEffect} from 'react';
import {useToast} from '@/hooks/useToast';
import {Toaster} from "@/components/ui/toaster";

interface CompanyTitleProps{
    logoUrl: string;
    name: string;
    wishCount: number;
    isLoggedIn: boolean;
    onToggleBookmark?: () => void;
    isBookmarked?: boolean;
}
export default function CompanyTitle({
    logoUrl,
    name,
    wishCount,
    isLoggedIn,
    onToggleBookmark,
    isBookmarked,
}:CompanyTitleProps){
    const [count, setCount] = useState(wishCount);
    const { toast } = useToast();

    useEffect(() => {
      setCount(wishCount);
    }, [wishCount]);

    return (
        <div className="flex items-center justify-end w-full px-2 text-2xl font-semibold">
          <Toaster />
        {/* 왼쪽 영역 */}
        <div className="flex gap-2 mr-auto">
          <img
            src={logoUrl}
            alt={`${name} 로고`}
            className="w-20 h-20 rounded-md object-contain border border-text-primary"
          />
          <div className="flex flex-col justify-end">
            <span>{name}</span>
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
                      if (onToggleBookmark) {
                        try{
                          await onToggleBookmark();
                          setCount(prev => isBookmarked === true ? prev - 1 : prev + 1);
                        }
                        catch(error){
                          console.error('북마크 토글 실패: ', error);
                        }
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
    )
}