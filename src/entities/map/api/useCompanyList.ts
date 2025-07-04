import { useQuery } from "@tanstack/react-query";
import { instance as axios } from "@/src/shared/api/axios";
// import { safeGet } from '@/src/shared/api/request';

import { RADIUS_BY_LEVEL } from "@/src/features/map/config/map"
import { CompanyProps } from "@/src/entities/map/model/company";

export const useCompanyList = (center: { lat: number; lng: number }, zoom: number) =>
  useQuery<CompanyProps[], Error>({
    queryKey: ["companyList", center.lat, center.lng, zoom],
    queryFn: async () => {
      const radius = RADIUS_BY_LEVEL[zoom] ?? 1000;
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies`, {
        params: { latitude: center.lat, longitude: center.lng, radius },
      });
      return data.data.companies;
    },
    placeholderData: (previous) => previous,
  });