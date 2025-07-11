import { safeGet, safePatch } from '@/src/shared/api/request';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { QueryClient } from '@tanstack/react-query';
import type { QueryFunctionContext } from '@tanstack/react-query';

export interface NotifyProps {
  id: number;
  type: string;
  content: string;
  notiDate: string;
  isRead: boolean;
}

export interface NotificationPage {
  important: NotifyProps[];
  basic: NotifyProps[];
  hasNext: boolean;
  nextCursor?: number;
}

const errorType = {
  important: [],
  basic: [],
  hasNext: false,
  nextCursor: undefined,
};

export const getNotification = async (context: QueryFunctionContext): Promise<NotificationPage> => {
  const pageParam = (context.pageParam as number) ?? 0;
  const token = useAuthStore.getState().token;

  if (!token) return errorType;
  let res;
  if (process.env.NEXT_USE_MOCK === 'true') {
    const mock = await fetch('/mock/mock-notification.json');
    res = await mock.json();
  } else {
    res = await safeGet('/api/v1/members/notifications', {
      ...(pageParam !== 0 ? { params: { cursor: pageParam } } : {}),
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  if (res.httpStatusCode === 200) {
    const all = res.data.notifications;
    const important = all.filter((noti: NotifyProps) => noti.type === 'RECRUITMENT');
    const basic = all.filter((noti: NotifyProps) => noti.type !== 'RECRUITMENT');
    const { nextCursor, hasNext } = res.data;
    return { important, basic, nextCursor, hasNext };
  }
  return errorType;
};

export function useNotificationRead() {
  const queryClient = new QueryClient();
  const token = useAuthStore.getState().token;

  const markNotificationsAsRead = async (notificationIds: number[]): Promise<void> => {
    if (notificationIds.length === 0) return;

    const previousUserInfo = queryClient.getQueryData(['userInfo']);
    try {
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
      queryClient.refetchQueries({ queryKey: ['userInfo'] });
    } catch (error) {
      queryClient.setQueryData(['userInfo'], previousUserInfo);
    }
  };

  return { markNotificationsAsRead };
}
