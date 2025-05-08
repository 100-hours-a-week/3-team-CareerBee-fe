import { PiBookmarkSimple, PiShare } from 'react-icons/pi';
import {Toggle} from '@/components/ui/toggle';
import {Button} from '@/components/ui/button';

interface CompanyTitleProps{
    logoUrl: string;
    name: string;
    wishCount: number;
    isLoggedIn: boolean;
    isBookmarked: boolean;
}
export default function CompanyTitle({
    logoUrl,
    name,
    wishCount,
    isLoggedIn,
    isBookmarked,
}:CompanyTitleProps){

    return (
        <div className="flex items-center justify-end w-full text-2xl font-semibold">
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
            <Button variant="icon" label={<PiShare/>} className="text-text-primary"/>
              {isLoggedIn ? (
                  <Toggle
                  variant="save"
                  label={<PiBookmarkSimple />}
                  pressed={isBookmarked}
              />
              ) : (
                <PiBookmarkSimple />
              )}
            <span className="text-lg mr-1">{wishCount}</span>
          </div>
        </div>
      </div>
    )
}