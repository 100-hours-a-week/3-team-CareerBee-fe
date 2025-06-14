import Notify from '@/features/Member/notification/components/notify';
import { CircleLoader } from '@/components/ui/loader';

import {
  getNotification,
  useNotification,
  useNotificationRead,
  NotifyProps,
} from '@/features/Member/notification/hooks/useNotification';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import React from 'react';

export default function Notification() {
  const { recruitmentNotify, basicNotify } = useNotification();

  // 쿼리에 저장
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: getNotification,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage?.hasNext ? lastPage.nextCursor : undefined),
  });

  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [bottomRef, hasNextPage]);

  // 안 읽은 알림 읽음 처리
  const { markNotificationsAsRead } = useNotificationRead();
  useEffect(() => {
    if (!data?.pages) return;

    const unread = data.pages
      .flatMap((page) => [...(page?.basic || []), ...(page?.important || [])])
      .filter((noti) => !noti.isRead)
      .map((noti) => noti.id);

    if (unread.length > 0) {
      markNotificationsAsRead(unread);
    }
  }, [data?.pages]);

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
              isRead={noti.isRead}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mx-5 py-2 border-b-2 border-text-secondary/60">
        <div className="flex mr-auto mb-2">기본 알림</div>
        <div className="flex flex-col gap-1.5 w-full">
          {data?.pages?.length ? (
            data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group?.basic?.map((noti: NotifyProps) => (
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
                    isRead={noti.isRead}
                  />
                ))}
              </React.Fragment>
            ))
          ) : (
            <div className="flex justify-center text-sm text-text-secondary py-2 w-full">
              지금은 새로운 알림이 없어요.
            </div>
          )}
          {isFetchingNextPage ? (
            <div className="flex items-center justify-center w-24 p-8 h-full">
              <CircleLoader />
            </div>
          ) : hasNextPage ? (
            <div ref={bottomRef} className="flex-none w-20 h-20" />
          ) : data?.pages?.length ? (
            <div className="flex-none w-full py-2 flex flex-col items-center justify-center text-text-secondary">
              <span className="text-xs text-center">끝까지 봤어요!</span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
