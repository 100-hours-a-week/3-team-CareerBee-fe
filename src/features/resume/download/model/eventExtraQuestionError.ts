import { useAIResponseState } from '@/src/features/resume/download/model/extraQuestionStore';
import { toast } from '@/src/shared/model/useToast';

import { EventSourcePolyfill } from 'event-source-polyfill';

export const eventExtraQuestionError = (eventSource: EventSourcePolyfill) => {
  eventSource.addEventListener('advanced-resume-init-error', async (_e: any) => {
    useAIResponseState.getState().setIsLoading(false);
    toast({ variant: 'destructive', title: 'AI 오류 발생' });
  });
};

export const eventExtraQuestionSecondError = (eventSource: EventSourcePolyfill) => {
  eventSource.addEventListener('advanced-resume-update-error', async (_e: any) => {
    useAIResponseState.getState().setIsLoading(false);
    toast({ variant: 'destructive', title: 'AI 오류 발생' });
  });
};
