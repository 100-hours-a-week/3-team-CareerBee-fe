import { safeGet } from '@/src/shared/api/request';

export const getUserInfo = async (token: string) => {
  const res = await safeGet('/api/v1/members', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; // { nickname, hasNewNotification, point, profileImage, frameImage }
};
