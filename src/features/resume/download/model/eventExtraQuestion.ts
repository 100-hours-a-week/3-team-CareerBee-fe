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
        const link = document.createElement('a');
        link.href = rawUrl;
        const defaultFileName = 'resume_download.docx';
        try {
          const url = new URL(rawUrl);
          const pathname = url.pathname;
          const extractedName = pathname.substring(pathname.lastIndexOf('/') + 1);
          link.download = extractedName || defaultFileName;
        } catch {
          link.download = defaultFileName;
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }

    useAIResponseState.getState().setIsLoading(false);
  });
};
