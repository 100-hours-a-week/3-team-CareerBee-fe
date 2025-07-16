import { useAIResponseState } from '@/src/features/resume/download/api/fetchQuestion';

import { useQueryClient } from '@tanstack/react-query';
import { EventSourcePolyfill } from 'event-source-polyfill';

export interface AIQuestion {
  question: string;
  answer: string;
}

export const eventAIQuestionReady = (eventSource: EventSourcePolyfill) => {
  const { setIsLoading } = useAIResponseState();
  const queryClient = useQueryClient();

  eventSource.addEventListener('ai-question-ready', async (e: any) => {
    const newQuestion = JSON.parse(e.data);

    queryClient.setQueryData(['aiQuestion'], newQuestion);
    queryClient.setQueryData<AIQuestion>(['aiQuestion'], newQuestion);
    setIsLoading(false);
  });
};
