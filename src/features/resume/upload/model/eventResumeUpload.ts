import { useUploadStore } from '@/src/features/resume/upload/model/uploadStore';
import { useResumeResultStore } from '@/src/features/resume/form/model/resumeStore';

import { EventSourcePolyfill } from 'event-source-polyfill';

export const eventAIQuestionReady = (eventSource: EventSourcePolyfill) => {
  const { setIsLoading } = useUploadStore();

  eventSource.addEventListener('ai-question-ready', async (e: any) => {
    const data = JSON.parse(e.data);
    useResumeResultStore.getState().setResult(data);
    setIsLoading(false);
  });
};
