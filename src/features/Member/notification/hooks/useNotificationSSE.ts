import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { EventSourcePolyfill } from 'event-source-polyfill';

export const useNotificationSSE = (enabled: boolean) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    const EventSource = EventSourcePolyfill;
    const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/sse/subscribe`);

    eventSource.onmessage = (event) => {
      const { hasNew } = JSON.parse(event.data); //TODO: response 형식과 맞추기
      if (hasNew) {
        queryClient.setQueryData(['userinfo'], (prev: any) => ({
          ...prev,
          hasNewAlarm: true,
        }));
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE 연결 오류:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [enabled]);
};
