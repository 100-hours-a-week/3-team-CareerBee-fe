import {
  useExtraQuestion,
  useAIResponseState,
} from '@/src/features/resume/download/model/extraQuestionStore';

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

      if (rawUrl) {
        const matches = rawUrl.match(/file_url=([^,]+), file_name=([^\}]+)/);

        if (matches && matches.length === 3) {
          const fileUrl = matches[1];
          const fileName = matches[2];

          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error('resumeUrl 파싱 실패:', rawUrl);
        }
      }
    }

    useAIResponseState.getState().setIsLoading(false);
  });
};
