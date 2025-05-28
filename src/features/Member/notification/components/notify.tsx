import { cn } from '@/lib/utils';

interface NotifyProps {
  title: string;
  description: string;
  time: string;
}

export default function Notify({ title, description, time }: NotifyProps) {
  return (
    <div
      className={cn(
        `flex flex-col items-center justify-center my-auto px-16 gap-2 rounded-lg  p-2 w-full`,
        title === '공채 알림' ? 'bg-secondary' : 'bg-white',
      )}
    >
      <div className="flex justify-between w-full text-xs">
        <>
          <div className="flex mr-auto">{title}</div>
        </>
        <div className="flex text-left text-text-secondary">{time}</div>
      </div>
      <div className="w-full text-sm">{description}</div>
    </div>
  );
}
