import { useFeedbackStore } from '@/src/features/interview/model/feedbackStore';

import { EventSourcePolyfill } from 'event-source-polyfill';

export const eventFeedback = (eventSource: EventSourcePolyfill) => {
  eventSource.addEventListener('problem-feedback', async (_e: any) => {
    // const feedback = JSON.parse(e.data);

    // queryClient.setQueryData(['feedback', 'FRONTEND'], feedback);
    useFeedbackStore.getState().setIsLoading(false);
    useFeedbackStore.getState().setIsReady(true);
  });
};
