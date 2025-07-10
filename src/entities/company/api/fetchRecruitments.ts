import { safeGet } from '@/src/shared/api/request';

export const fetchRecruitments = async ({ companyId }: { companyId: number }) => {
  const res = await safeGet(`/api/v1/companies/${companyId}/recruitments`);

  if (res.httpStatusCode == 200) {
    return res.data.recruitments;
  }
  return [];
};
