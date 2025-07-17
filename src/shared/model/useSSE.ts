import { useAuthStore } from '@/src/entities/auth/model/auth';
import { retryWithRefreshedToken } from '@/src/entities/auth/lib/authManager';

import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

export const useSSE = () => {
  const queryClient = useQueryClient();
  const sseRef = useRef<EventSource | null>(null);

  const token = useAuthStore.getState().token;
  if (sseRef.current) return; // 이미 연결된 경우 실행 방지
  if (!token) return;

  const EventSource = EventSourcePolyfill || NativeEventSource;
  let retryCount = 0;

  const connect = () => {
    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/sse/subscribe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      heartbeatTimeout: 60 * 60 * 1000,
      withCredentials: true,
    });

    sseRef.current = eventSource;

    eventSource.addEventListener('open', () => {
      retryCount = 0;
    });

    // 새 알림 수신
    eventSource.addEventListener('notification', (e: any) => {
      if (e.data === 'true') {
        queryClient.setQueryData(['userInfo'], (prev: any) => ({
          ...prev,
          hasNewAlarm: true,
        }));
      }
    });

    eventSource.onerror = (error) => {
      eventSource.close();
      sseRef.current = null;

      // 토큰 이슈로 연결 해제 시
      if ((error as any).status === 401) {
        retryWithRefreshedToken(eventSource);
      } else {
        const retryDelay = Math.min(1000 * 2 ** retryCount, 30000); // 최대 30초
        retryCount += 1;

        setTimeout(() => {
          console.log(`SSE 재연결 시도 (${retryCount}회)...`);
          connect();
        }, retryDelay);
      }
    };

    return () => {
      console.log('SSE 연결 해제');
      eventSource.close();
      sseRef.current = null;
    };
  };

  connect();
};
