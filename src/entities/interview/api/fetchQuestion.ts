import { safeGet } from '@/src/shared/api/request';
import { useQuestionStore } from '@/src/entities/interview/model/questionStore';

export const fetchQuestions = async () => {
  try {
    const res = await safeGet('/api/v1/interview-problems');

    if (res.httpStatusCode === 200 && res.data?.interviewProblems) {
      useQuestionStore.getState().setQuestions(res.data.interviewProblems);
    }
  } catch (e) {
    console.error('비회원 면접문제 조회 실패', e);
  }
};
