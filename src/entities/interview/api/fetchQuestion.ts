import { safeGet } from '@/src/shared/api/request';

export const fetchQuestions = async () => {
  try {
    const res = await safeGet('/api/v1/interview-problems');
    if (res.httpStatusCode === 200 && res.data?.interviewProblems) {
      return res.data.interviewProblems;
    }
    return [];
  } catch (e) {
    console.error('비회원 면접문제 조회 실패', e);
    return [];
  }
};
