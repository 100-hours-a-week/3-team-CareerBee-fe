import competition from '@/features/Member/notification/image/competition.png';
import growth from '@/features/Member/notification/image/growth.png';
import point from '@/features/Member/notification/image/point.png';
import recruit from '@/features/Member/notification/image/recruit.png';

import { cn } from '@/lib/utils';
import { format, isToday } from 'date-fns';

interface NotifyProps {
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

const iconMap: Record<string, string> = {
  '공채 알림': recruit,
  'CS 대회': competition,
  진척도: growth,
  포인트: point,
};

export default function Notify({ title, description, time, isRead }: NotifyProps) {
  const date = new Date(time);
  const displayTime = isToday(date)
    ? format(date, 'a h시 m분').replace('AM', '오전').replace('PM', '오후')
    : format(date, 'M월 d일');

  return (
    <div
      className={cn(
        `flex flex-col w-full items-center justify-center 
        my-auto px-16 gap-2 p-2 
        rounded-lg drop-shadow-sm`,
        title === '공채 알림'
          ? isRead
            ? 'bg-secondary'
            : 'gradient-border-red bg-secondary'
          : isRead
            ? 'bg-white'
            : 'gradient-border-yellow bg-white',
      )}
    >
      <div className="flex justify-between w-full text-xs">
        <div className="flex align-bottom gap-1">
          {(() => {
            const imageSrc = iconMap[title] || undefined;
            return <img src={imageSrc} alt={title} className="w-4 h-4" />;
          })()}
          <div className="flex text-[10px] mr-auto">{title}</div>
        </div>
        <div className="flex text-left text-text-secondary">{displayTime}</div>
      </div>
      <div className="pl-5 w-full text-sm">{description}</div>
    </div>
  );
}
