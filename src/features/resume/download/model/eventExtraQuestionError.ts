import {
  useExtraQuestion,
  useAIResponseState,
} from '@/src/features/resume/download/model/extraQuestionStore';
import { Toast } from '@/src/shared/ui/toast';

import { EventSourcePolyfill } from 'event-source-polyfill';

export const eventExtraQuestionError = (eventSource: EventSourcePolyfill) => {
  eventSource.addEventListener('advanced-resume-init-error', async (e: any) => {
    const data = JSON.parse(e.data);
    useExtraQuestion.getState().setExtraQuestion(data);
    useAIResponseState.getState().setIsLoading(false);
    Toast({ variant: 'destructive', title: 'AI 오류 발생' });
  });
};
