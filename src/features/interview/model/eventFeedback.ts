import { useFeedbackStore } from '@/src/features/interview/model/feedbackStore';

import { EventSourcePolyfill } from 'event-source-polyfill';

export const eventFeedback = (eventSource: EventSourcePolyfill) => {
  eventSource.addEventListener('problem-feedback', async (e: any) => {
    const feedback = JSON.parse(e.data);

    console.log('problem-feedback', feedback.feedback);
    useFeedbackStore.getState().setFeedback(feedback.feedback);
    // queryClient.setQueryData(['feedback', 'FRONTEND'], feedback);
    useFeedbackStore.getState().setIsLoading(false);
    useFeedbackStore.getState().setIsReady(true);
  });
};
