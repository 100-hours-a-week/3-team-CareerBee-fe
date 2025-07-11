import { safeGet } from '@/src/shared/api/request';

export const fetchWishCount = async ({ companyId }: { companyId: number }) => {
  const res = await safeGet(`/api/v1/companies/${companyId}/wish-count`);

  if (res.httpStatusCode == 200) {
    return res.data.wishCount;
  }
  return null;
};
