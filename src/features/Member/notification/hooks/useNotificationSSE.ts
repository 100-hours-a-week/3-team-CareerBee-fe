import { useAuthStore } from '../../auth/store/auth';

import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

export const useNotificationSSE = (shouldConnect: boolean) => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const sseRef = useRef<EventSource | null>(null);
  // const token = useAuthStore.getState().token;

  useEffect(() => {
    const token = useAuthStore.getState().token;
    if (!shouldConnect || !token) return;
    if (sseRef.current) {
      console.log('⚠️ 삭제 후 재연결');
      sseRef.current.close();
      sseRef.current = null;
      sessionStorage.removeItem('sse_connected');
    }

    console.log('1. SSE 연결 시도 중...');
    const EventSource = EventSourcePolyfill || NativeEventSource;
    let eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/sse/subscribe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      heartbeatTimeout: 10000,
    });
    // setInterval(() => {
    //   const ready = sseRef.current?.readyState;
    //   console.log(ready);
    //   if (ready === EventSource.CLOSED) {
    //     console.warn('SSE 연결 닫힘 감지됨. 재연결 시도 가능');
    //     // 재연결 로직
    //     eventSource.close();
    //     sseRef.current = null;
    //     sessionStorage.removeItem('sse_connected');
    //     eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/sse/subscribe`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //       heartbeatTimeout: 10000,
    //     });
    //   }
    // }, 3000);

    sseRef.current = eventSource;

    eventSource.addEventListener('open', () => {
      console.log('SSE 연결 성공');
      sessionStorage.setItem('sse_connected', 'true');
    });

    eventSource.onmessage = (event) => {
      const parsed = event.data;
      if (parsed.event === 'notification' && parsed.hasNew) {
        queryClient.setQueryData(['userinfo'], (prev: any) => ({
          ...prev,
          hasNewAlarm: true,
        }));
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE 연결 오류:', error);
      eventSource.close();
      sseRef.current = null;
      sessionStorage.removeItem('sse_connected');
      if ((error as any).status === 401) {
        //재연결 요청하기
        console.log("SSE returned 401")
      }
    };

    return () => {
      console.log("SSE 연결 해제");
      eventSource.close();
      sseRef.current = null;
      sessionStorage.removeItem('sse_connected');
    };
  }, [shouldConnect, token]);
};
