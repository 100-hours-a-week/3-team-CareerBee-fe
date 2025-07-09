import { instance as axios } from '@/src/shared/api/axios';

const fetchBookmarkedIds = async (token: string): Promise<number[]> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/members/wish-companies/id-list`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data.data.wishCompanies;
};

export default fetchBookmarkedIds;
