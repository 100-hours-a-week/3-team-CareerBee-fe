import { useQuery } from "@tanstack/react-query";
import { instance as axios } from "@/src/shared/api/axios";
import { useMapStore } from '@/src/features/map/model/map';

import { RADIUS_BY_LEVEL, KTB } from "@/src/features/map/config/map"
import { CompanyProps } from "@/src/entities/map/model/company";

export const useCompanyList = () => {
  const { center, zoom } = useMapStore();

  const isReady =
    center?.lat !== undefined &&
    center?.lng !== undefined &&
    zoom !== undefined;

  const latBucket = isReady ? Math.round(center.lat * 1000) / 1000 : KTB.lat;
  const lngBucket = isReady ? Math.round(center.lng * 1000) / 1000 : KTB.lng;
  const zoomBucket = isReady ? zoom : 5;

  return useQuery<CompanyProps[], Error>({
    queryKey: ["companyList", latBucket, lngBucket, zoomBucket],
    queryFn: async () => {
      if (!center || zoom === undefined) {
        throw new Error('Map center and zoom must be defined');
      }
      const radius = RADIUS_BY_LEVEL[zoom] ?? 1000;
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies`, {
        params: { latitude: center.lat, longitude: center.lng, radius },
      });
      return data.data.companies;
    },
    enabled: isReady,
    placeholderData: (previous) => previous,
    staleTime: 5 * 60 * 1000,
  });
}