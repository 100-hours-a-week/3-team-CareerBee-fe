import { useAuthStore } from '@/src/entities/auth/model/auth';
import { safeGet } from '@/src/shared/api/request';
import { interviewType } from '../model/interviewType';

import type { QueryFunctionContext } from '@tanstack/react-query';

export interface interviewProps {
  id: number;
  type: interviewType;
  question: string;
  answer: string;
  feedback: string;
}

export interface savedInterviewProps {
  interview: interviewProps[];
  hasNext: boolean;
  nextCursor?: number;
}

const errorType = {
  interview: [],
  hasNext: false,
  nextCursor: undefined,
};

export const fetchSavedInterview = async (
  context: QueryFunctionContext,
): Promise<savedInterviewProps> => {
  const pageParam = (context.pageParam as number) ?? 0;
  const token = useAuthStore.getState().token;

  if (!token) return errorType;

  const res = await safeGet('/api/v1/members/interview-problems/saved', {
    ...(pageParam !== 0 ? { params: { cursor: pageParam } } : {}),
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.httpStatusCode === 200) {
    const interview = res.data.savedProblems;
    const { nextCursor, hasNext } = res.data;
    return { interview, nextCursor, hasNext };
  }
  return errorType;
};
