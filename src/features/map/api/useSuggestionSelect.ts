import { instance as axios } from '@/src/shared/api/axios';
import { CompanySuggestion } from '@/src/features/map/model/search';

import { useMapStore } from '@/src/features/map/model/map';
import { useCompanyStore } from '@/src/shared/lib/company';
import { useMapRefStore } from '@/src/features/map/model/mapRef';

export function useSuggestionSelect() {
  const { setCenter, setZoom } = useMapStore();
  const { setHighlightedCompanyId } = useCompanyStore();
  const { mapRef } = useMapRefStore();

  const handleSuggestionSelect = async (suggestion: CompanySuggestion) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${suggestion.id}/locations`,
      );
      const { latitude, longitude } = res.data.data.locationInfo;

      setHighlightedCompanyId(suggestion.id);

      if (mapRef) {
        const newCenter = new window.kakao.maps.LatLng(latitude, longitude);
        mapRef.setLevel(3);
        mapRef.setCenter(newCenter);

        setCenter({
          lat: newCenter.getLat(),
          lng: newCenter.getLng(),
        });
        setZoom(3);
      }
    } catch (error) {
      console.error('❌ 기업 위치 정보 조회 실패', error);
    }
  };

  return { handleSuggestionSelect };
}
