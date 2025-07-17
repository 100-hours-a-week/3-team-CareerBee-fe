import { useFeedbackStore } from '@/src/features/interview/model/feedbackStore';

import { useQueryClient } from '@tanstack/react-query';
import { EventSourcePolyfill } from 'event-source-polyfill';

export const eventFeedback = (eventSource: EventSourcePolyfill) => {
  const { setIsLoading } = useFeedbackStore();
  const queryClient = useQueryClient();

  eventSource.addEventListener('problem-feedback', async (e: any) => {
    const feedback = JSON.parse(e.data);

    queryClient.setQueryData(['feedback', 'FRONTEND'], feedback);
    setIsLoading(false);
  });
};
