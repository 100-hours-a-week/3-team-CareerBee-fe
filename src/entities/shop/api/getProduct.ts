import { safeGet } from '@/src/shared/api/request';

const getProduct = async () => {
  try {
    const res = await safeGet('/api/v1/tickets/info');
    if (res.httpStatusCode == 200) {
      const { redTicket, greenTicket, blueTicket } = res.data;
      return {
        red: redTicket,
        green: greenTicket,
        blue: blueTicket,
      };
    }
  } catch {
    return null;
  }
};

export default getProduct;
