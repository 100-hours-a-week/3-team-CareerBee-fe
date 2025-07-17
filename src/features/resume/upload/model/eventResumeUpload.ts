import { useUploadStore } from '@/src/features/resume/upload/model/uploadStore';
import { useResumeResultStore } from '@/src/features/resume/form/model/resumeStore';

import { EventSourcePolyfill } from 'event-source-polyfill';

export const eventResumeUpload = (eventSource: EventSourcePolyfill) => {
  eventSource.addEventListener('resume-extracted', async (e: any) => {
    const data = JSON.parse(e.data);
    useResumeResultStore.getState().setResult(data);
    useUploadStore.getState().setIsLoading(false);
  });
};
