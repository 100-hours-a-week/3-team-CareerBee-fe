import { cn } from '@/lib/utils';
import competition from '@/features/Member/notification/image/competition.png';
import growth from '@/features/Member/notification/image/growth.png';
import point from '@/features/Member/notification/image/point.png';
import recruite from '@/features/Member/notification/image/recruite.png';

interface NotifyProps {
  title: string;
  description: string;
  time: string;
}

const iconMap: Record<string, string> = {
  '공채 알림': recruite,
  'CS 대회': competition,
  진척도: growth,
  포인트: point,
};

export default function Notify({ title, description, time }: NotifyProps) {
  return (
    <div
      className={cn(
        `flex flex-col items-center justify-center my-auto px-16 gap-2 rounded-lg  p-2 w-full`,
        title === '공채 알림' ? 'bg-secondary' : 'bg-white',
      )}
    >
      <div className="flex justify-between w-full text-xs">
        <div className="flex align-bottom gap-1">
          {(() => {
            const imageSrc = iconMap[title] || undefined;
            return <img src={imageSrc} alt={title} className="w-4 h-4" />;
          })()}
          <div className="flex mr-auto">{title}</div>
        </div>
        <div className="flex text-left text-text-secondary">{time}</div>
      </div>
      <div className="pl-5 w-full text-sm">{description}</div>
    </div>
  );
}
