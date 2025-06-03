// src/api/user.ts
import { safeGet } from '@/lib/request';

export const getUserInfo = async (token: string) => {
  const res = await safeGet('/api/v1/members', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data; // { nickname, point, profileImage, badgeImage, frameImage }
};
