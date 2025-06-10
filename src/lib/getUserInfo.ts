import { safeGet } from '@/lib/request';

export const getUserInfo = async (token: string) => {
  const res = await safeGet('/api/v1/members', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('res', res);
  return res.data; // { nickname, hasNewNotification, point, profileImage, badgeImage, frameImage }
};
