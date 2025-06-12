import Notify from '@/features/Member/notification/components/notify';

import {
  useNotification,
  useNotificationRead,
  NotifyProps,
} from '@/features/Member/notification/hooks/useNotification';

import { useEffect } from 'react';

export default function Notification() {
  const { recruitmentNotify, basicNotify } = useNotification();

  // 안 읽은 알림 읽음 처리
  const { markNotificationsAsRead } = useNotificationRead();
  useEffect(() => {
    const unread = [...recruitmentNotify, ...basicNotify]
      .filter((noti) => !noti.isRead)
      .map((noti) => noti.id);
    if (unread.length > 0) {
      markNotificationsAsRead(unread);
    }
  }, [recruitmentNotify, basicNotify]);

  return (
    <>
      <div className="flex flex-col items-center justify-center mx-5 py-2 border-b-2 border-text-secondary/60">
        <div className="flex mr-auto mb-2">중요한 알림</div>
        <div className="flex flex-col gap-1.5 w-full">
          {recruitmentNotify.map((noti: NotifyProps) => (
            <Notify
              key={noti.id}
              title="공채 알림"
              description={noti.content}
              time={noti.notiDate}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mx-5 py-2 border-b-2 border-text-secondary/60">
        <div className="flex mr-auto mb-2">기본 알림</div>
        <div className="flex flex-col gap-1.5 w-full">
          {basicNotify.map((noti: NotifyProps) => (
            <Notify
              key={noti.id}
              title={
                noti.type === 'COMPETITION'
                  ? 'CS 대회'
                  : noti.type === 'PROGRESS'
                    ? '진척도'
                    : '포인트'
              }
              description={noti.content}
              time={noti.notiDate}
            />
          ))}
        </div>
      </div>
    </>
  );
}
