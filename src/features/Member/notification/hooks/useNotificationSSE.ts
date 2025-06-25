import { useAuthStore } from '../../auth/store/auth';
import { retryWithRefreshedToken } from '../../auth/utils/authManager';

import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

export const useNotificationSSE = () => {
  const queryClient = useQueryClient();
  const sseRef = useRef<EventSource | null>(null);

  // useEffect(() => {
  const token = useAuthStore.getState().token;
  if (sseRef.current) return; // 이미 연결된 경우 실행 방지
  if (!token) return;

  const EventSource = EventSourcePolyfill || NativeEventSource;
  const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/sse/subscribe`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    heartbeatTimeout: 60 * 60 * 1000,
    withCredentials: true,
  });

  sseRef.current = eventSource;

  eventSource.addEventListener('open', () => {
    console.log('SSE 연결 성공', eventSource);
  });

  eventSource.addEventListener('notification', (e: any) => {
    if (e.data === 'true') {
      queryClient.setQueryData(['userInfo'], (prev: any) => ({
        ...prev,
        hasNewAlarm: true,
      }));
    }
  });

  eventSource.onerror = (error) => {
    console.error('SSE 연결 오류:', error);
    eventSource.close();
    sseRef.current = null;
    if ((error as any).status === 401) {
      //재연결 요청하기
      retryWithRefreshedToken(eventSource);
    }
  };

  return () => {
    console.log('SSE 연결 해제');
    eventSource.close();
    sseRef.current = null;
  };
  // }, []);
};
