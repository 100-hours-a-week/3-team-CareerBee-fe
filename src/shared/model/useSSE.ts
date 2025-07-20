'use client';

import { useAuthStore } from '@/src/entities/auth/model/auth';
import { retryWithRefreshedToken } from '@/src/entities/auth/lib/authManager';

import {
  eventExtraQuestion,
  eventExtraQuestionSecond,
} from '@/src/features/resume/download/model/eventExtraQuestion';
import {
  eventExtraQuestionError,
  eventExtraQuestionSecondError,
} from '@/src/features/resume/download/model/eventExtraQuestionError';
import { eventResumeUpload } from '@/src/features/resume/upload/model/eventResumeUpload';

import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useEffect } from 'react';

export const useSSE = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore.getState().token;
  const sseRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (sseRef.current || !token || token.length < 10) return;

    const EventSource = EventSourcePolyfill || NativeEventSource;
    let retryCount = 0;

    const connect = () => {
      const eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sse/subscribe`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          heartbeatTimeout: 60 * 60 * 1000,
          withCredentials: true,
        },
      );

      sseRef.current = eventSource;

      eventSource.addEventListener('open', () => {
        retryCount = 0;
      });

      eventSource.addEventListener('notification', (e: any) => {
        if (e.data === 'true') {
          queryClient.setQueryData(['userInfo'], (prev: any) => ({
            ...prev,
            hasNewAlarm: true,
          }));
        }
      });

      eventExtraQuestion(eventSource);
      eventExtraQuestionSecond(eventSource);
      eventExtraQuestionError(eventSource);
      eventExtraQuestionSecondError(eventSource);
      eventResumeUpload(eventSource);

      eventSource.onerror = (error) => {
        console.log('SSE 연결 오류');
        eventSource.close();
        sseRef.current = null;

        if ((error as any).status === 401) {
          retryWithRefreshedToken(eventSource);
        } else {
          const retryDelay = Math.min(1000 * 2 ** retryCount, 30000);
          retryCount += 1;

          setTimeout(() => {
            console.log(`SSE 재연결 시도 (${retryCount}회)...`);
            connect();
          }, retryDelay);
        }
      };
    };

    connect();

    return () => {
      console.log('SSE 연결 해제');
      sseRef.current?.close();
      sseRef.current = null;
    };
  }, [token]);
};
