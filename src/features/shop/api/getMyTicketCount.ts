'use client';

import { safeGet } from "@/src/shared/api/request";
import { useAuthStore } from '@/src/entities/auth/model/auth';

const getMyTicketCount = async() => {
  const token = useAuthStore.getState().token;

  try{
    const res = await safeGet('/api/v1/members/tickets',{
        headers: { Authorization: `Bearer ${token}` },
      });
    if(res.httpStatusCode == 200){
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
}

export default getMyTicketCount;