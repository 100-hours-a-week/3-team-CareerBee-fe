// 지도 기반의 검색 페이지. 메인 페이지이자 진입 페이지.
// 도메인 상에서 "지도 도메인"

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/domain/SearchBar';
import { FilterGroup } from '@/components/ui/filter'
import { Map } from 'react-kakao-maps-sdk';
import MapOverlay from '@/components/domain/MapOverlay';
import { useCompanyStore } from '@/store/company';
import { useSearchStore } from '@/store/search';
import { useFetchSuggestions } from '@/hooks/useFetchSuggestions';

import axios from 'axios';

const KTB = {
  "lat": 37.40014087574066,
  "lng": 127.10677853166985
}
const RADIUS_BY_LEVEL: Record<number, number> = {
  1: 100,
  2: 200,
  3: 300,
  4: 600,
  5: 1000,
  6: 1500,
  7: 2000,
  8: 2500,
  9: 3000,
  10: 4000,
  11: 5000,
  12: 6000,
  13: 8000,
  14: 10000,
};
const FILTERS = [
  { id: "open", label: "✅ 채용 중" },
  { id: "bookmark", label: "📍 저장" },
  { id: "si", label: "SI" },
  { id: "game", label: "게임" },
  { id: "finance", label: "금융" },
  { id: "security", label: "보안" },
  { id: "service", label: "서비스" },
];
export interface CompanyProps {
  id: number;
  markerUrl: string;
  locationInfo: {
    latitude: number;
    longitude: number;
  };
}

export default function Main() {
  const { search, setSearch, suggestions } = useSearchStore();
  useFetchSuggestions();

  const [loaded, setLoaded] = useState(false);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  
  const {
    openCardIndex,
  } = useCompanyStore();

  const fetchCompanies = async (
    latitude: number,
    longitude: number,
    level: number) => {
    const radius = RADIUS_BY_LEVEL[level] ?? 1000;
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/companies`, {
        params: {
          latitude,
          longitude,
          radius,
        },
      });
      setCompanies(data.data.companies);
      console.log(data.data.companies);
    } catch (error) {
      console.error('기업 리스트 조회 실패:', error);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_KEY}&autoload=false&libraries=clusterer,drawing`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setLoaded(true);
        
        fetchCompanies(KTB.lat, KTB.lng, 3);
      });
    };
    document.head.appendChild(script);
  }, []);

  const handleMapMove = (map: kakao.maps.Map) => {
    const level = map.getLevel();
    const latlng = map.getCenter();
    fetchCompanies(latlng.getLat(), latlng.getLng(), level);
  };
  return (
    <>
      <div className="py-2 px-4 w-full">
        <SearchBar
          placeholder="검색어를 입력하세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          suggestions={suggestions}
          onSuggestionSelect={(value: string) => setSearch(value)}
        />
      </div>
      <div className="flex item-center justify-center relative w-full h-full">
        {loaded && (
          <Map
            center={{ lat: KTB.lat, lng: KTB.lng }}
            className="w-full h-full"
            level={3}
            onZoomChanged={handleMapMove}
            onDragEnd={handleMapMove}
          >
            {companies.map((company, index) => (
              <MapOverlay
                key={company.id}
                company={company}
                index={index}
                isOpen={openCardIndex === index}
              />
            ))}
          </Map>
        )}

        {/* 필터 UI를 지도 위에 고정 */}
        <div className="absolute top-2 left-1 z-10">
          <FilterGroup filters={FILTERS} />
        </div>
      </div>
    </>
  );
}
