import { interviewType } from '@/src/entities/interview/model/interviewType';

import { safeGet } from '@/src/shared/api/request';
import { useAuthStore } from '@/src/entities/auth/model/auth';

export const fetchMemberQuestions = async ({ type }: { type: interviewType }) => {
  const token = useAuthStore.getState().token;

  try {
    const res = await safeGet(`/api/v1/members/interview-problems?type=${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.httpStatusCode === 200) {
      return res.data;
    }
  } catch (e) {
    console.error('회원 면접문제 조회 실패', e);
  }
};
