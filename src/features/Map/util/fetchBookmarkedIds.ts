import { instance as axios } from '@/features/Member/auth/utils/axios';

const fetchBookmarkedIds = async (token: string): Promise<number[]> => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/members/wish-companies/id-list`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data.data.wishCompanies;
};

export default fetchBookmarkedIds;
