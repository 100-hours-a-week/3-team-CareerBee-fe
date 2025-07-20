import {
  useExtraQuestion,
  useAIResponseState,
} from '@/src/features/resume/download/model/extraQuestionStore';
import { useDownload } from '@/src/features/resume/download/model/downloadStore';

import { EventSourcePolyfill } from 'event-source-polyfill';

export const eventExtraQuestion = (eventSource: EventSourcePolyfill) => {
  eventSource.addEventListener('advanced-resume-init', async (e: any) => {
    const res = JSON.parse(e.data);
    const data = {
      type: 'in-progress',
      question: res.question,
    };
    useExtraQuestion.getState().setExtraQuestion(data);
    useAIResponseState.getState().setIsLoading(false);
  });
};

export const eventExtraQuestionSecond = (eventSource: EventSourcePolyfill) => {
  eventSource.addEventListener('advanced-resume-update', async (e: any) => {
    const data = JSON.parse(e.data);
    if (data.type == 'in-progress') {
      useExtraQuestion.getState().setExtraQuestion(data);
    } else if (data.type == 'complete') {
      const rawUrl = data?.resumeDownloadUrl;

      useDownload.getState().setUrl(rawUrl);
      useDownload.getState().setIsReady(true);
    }

    useAIResponseState.getState().setIsLoading(false);
  });
};
