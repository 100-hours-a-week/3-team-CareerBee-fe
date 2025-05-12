// 지도 기반의 검색 페이지. 메인 페이지이자 진입 페이지.
// 도메인 상에서 "지도 도메인"

import { useState, useEffect, useRef } from 'react';
import { SearchBar } from '@/components/domain/SearchBar';
import { FilterGroup } from '@/components/ui/filter'
import { Map } from 'react-kakao-maps-sdk';
import MapOverlay from '@/components/domain/MapOverlay';
import { useCompanyStore } from '@/store/company';
import { useSearchStore } from '@/store/search';
import { useMarkerStore } from '@/store/marker';
import { useFetchSuggestions } from '@/hooks/useFetchSuggestions';

import { instance as axios } from '@/lib/axios';

import { useAuthStore  } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { PiCrosshairSimple } from "react-icons/pi";

import {useToast} from '@/hooks/useToast';
import {Toaster} from "@/components/ui/toaster";
const KTB = {
  "lat": 37.40014087574066,
  "lng": 127.10677853166985
}
const RADIUS_BY_LEVEL: Record<number, number> = {
  1: 150,
  2: 250,
  3: 500,
  4: 1100,
  5: 2000,
  6: 4000,
  7: 8000,
  8: 16250,
  9: 32500,
  10: 75000,
  11: 150000,
  12: 300000,
  13: 585000,
  14: 1170000,
};
const FILTERS = [
  { id: "recruiting", label: "✅ 채용 중" },
  { id: "bookmark", label: "📍 저장" },
  { id: "PLATFORM", label: "플랫폼" },
  { id: "SI", label: "SI" },
  { id: "COMMERCE", label: "커머스" },
  { id: "GAME", label: "게임" },
  { id: "TELECOM", label: "통신" },
  { id: "SECURITY", label: "보안" },
  { id: "FINANCE", label: "금융" },
];
export interface CompanyProps {
  id: number;
  markerUrl: string;
  businessType: string;
  recruitingStatus: string;
  locationInfo: {
    latitude: number;
    longitude: number;
  };
}

export default function Main() {
  // 디버그용 콘솔 찍기
  console.count('🌀 Main 렌더링 횟수');
  const token=useAuthStore((state) => state.token);
  useEffect(() => {
    // const token = useAuthStore.getState().token;
    console.log('zustand 저장 토큰:', token);
    const token2 = localStorage.getItem('auth-storage');
    if (token2) {
      const parsed = JSON.parse(token2);
      console.log('localStorage 토큰:', parsed?.state?.token);
    } else {
      console.log('⚠️ No token found in localStorage');
    }
  }, [token]);

  const { search, setSearch, suggestions } = useSearchStore();
  useFetchSuggestions();

  
  const [loaded, setLoaded] = useState(false);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  
  const {
    openCardIndex,
  } = useCompanyStore();

  const { markerDisabledMap } = useMarkerStore();

  const mapRef = useRef<kakao.maps.Map | null>(null);

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
        fetchCompanies(KTB.lat, KTB.lng, 3);
        setTimeout(() => {
          setLoaded(true);
        }, 300); // 지도 초기화 후 이벤트 발생 시간보다 약간 뒤에 false로 설정
      });
    };
    document.head.appendChild(script);
  }, []);

  const handleMapMove = (map: kakao.maps.Map) => {
    const level = map.getLevel();
    const latlng = map.getCenter();
    fetchCompanies(latlng.getLat(), latlng.getLng(), level);
  };

  const handleMoveToCurrentLocation = () => {
    if (!mapRef.current) return;
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentPos = new window.kakao.maps.LatLng(latitude, longitude);
        mapRef.current?.setCenter(currentPos);

        setTimeout(() => {
          if (mapRef.current) {
            handleMapMove(mapRef.current);
          }
        }, 300);
      },
      (error) => {
         if (error.code === error.PERMISSION_DENIED) {
          toast({title: `위치 권한이 차단되어 있어요.\n브라우저 설정에서 권한을 허용해주세요.`});
        } else {
          toast({title: '위치 정보를 가져올 수 없습니다.'});
        }
      }
    );
  };
  return (
    <>
      <Toaster />
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
            ref={mapRef}
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
                disabled={markerDisabledMap[company.id] ?? false}
              />
            ))}
          </Map>
        )}

        {/* 필터 UI를 지도 위에 고정 */}
        <div className="absolute top-2 left-1 right-2 z-10 px-2">
          <div className="max-w-full ">
            <FilterGroup filters={FILTERS} companies={companies} />
          </div>
        </div>

        {/* 내 위치 찾기 버튼 */}
        <div className="absolute bottom-6 left-3 z-10 [&_svg]:size-8">
          <div>
            <Button
              label={<PiCrosshairSimple/>}
              variant="icon"
              className='bg-white rounded-full w-12 h-12 m-0 p-2 shadow-md'
              onClick={handleMoveToCurrentLocation}
              />
              </div>
        </div>
      </div>
    </>
  );
}
