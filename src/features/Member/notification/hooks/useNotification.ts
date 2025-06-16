import { useEffect, useState } from 'react';
import { safeGet, safePatch } from '@/lib/request';
import { useAuthStore } from '@/features/Member/auth/store/auth';

export interface NotifyProps {
  id: number;
  type: string;
  content: string;
  notiDate: string;
  isRead: boolean;
}

export function useNotification() {
  const token = useAuthStore.getState().token;
  const [recruitmentNotify, setRecruitmentNotify] = useState<NotifyProps[]>([]);
  const [basicNotify, setBasicNotify] = useState<NotifyProps[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      let res;
      if (import.meta.env.VITE_USE_MOCK === 'true') {
        const mock = await fetch('/mock/mock-notification.json');
        res = await mock.json();
      } else {
        res = await safeGet('/api/v1/members/notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (res.httpStatusCode === 200) {
        const all = res.data.notifications;
        const important = all.filter((noti: NotifyProps) => noti.type === 'RECRUITMENT');
        const basic = all.filter((noti: NotifyProps) => noti.type !== 'RECRUITMENT');
        setRecruitmentNotify(important);
        setBasicNotify(basic);
      }
    };

    fetchNotifications();
  }, [token]);

  return { recruitmentNotify, basicNotify };
}

export function useNotificationRead() {
  const token = useAuthStore.getState().token;

  const markNotificationsAsRead = async (notificationIds: number[]): Promise<void> => {
    if (notificationIds.length === 0) return;
    await safePatch(
      '/api/v1/members/notifications',
      JSON.stringify({
        notificationIds,
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };

  return { markNotificationsAsRead };
}
