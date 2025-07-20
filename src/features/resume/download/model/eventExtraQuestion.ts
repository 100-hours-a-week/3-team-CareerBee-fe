import {
  useExtraQuestion,
  useAIResponseState,
} from '@/src/features/resume/download/model/extraQuestionStore';

import { EventSourcePolyfill } from 'event-source-polyfill';

export const eventExtraQuestion = (eventSource: EventSourcePolyfill) => {
  eventSource.addEventListener('advanced-resume-init', async (e: any) => {
    const data = JSON.parse(e.data);
    useExtraQuestion.getState().setExtraQuestion(data);
    useAIResponseState.getState().setIsLoading(false);
  });
};
