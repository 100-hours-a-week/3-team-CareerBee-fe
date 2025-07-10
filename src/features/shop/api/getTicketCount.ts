import { safeGet } from '@/src/shared/api/request';

const getTicketCount = async () => {
  try {
    const res = await safeGet('/api/v1/tickets');
    if (res.httpStatusCode == 200) {
      const { redCount, greenCount, blueCount } = res.data;
      return {
        red: redCount,
        green: greenCount,
        blue: blueCount,
      };
    }
  } catch {
    return null;
  }
};

export default getTicketCount;
