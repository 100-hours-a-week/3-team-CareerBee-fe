import { useAIResponseState } from '@/src/features/interview/model/feedbackStore';
import { toast } from '@/src/shared/model/useToast';

import { EventSourcePolyfill } from 'event-source-polyfill';

export const eventFeedbackError = (eventSource: EventSourcePolyfill) => {
  eventSource.addEventListener('problem-feedback-error', async (_e: any) => {
    useAIResponseState.getState().setIsLoading(false);
    toast({ variant: 'destructive', title: 'AI 오류 발생' });
  });
};
