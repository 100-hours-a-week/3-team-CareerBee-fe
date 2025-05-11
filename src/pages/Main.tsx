// 지도 기반의 검색 페이지. 메인 페이지이자 진입 페이지.
// 도메인 상에서 "지도 도메인"

import { useState, useEffect, useRef } from 'react';
import { SearchBar } from '@/components/domain/SearchBar';
import { FilterGroup } from '@/components/ui/filter'
import { Map, Polygon } from 'react-kakao-maps-sdk';
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

import { KTB, RADIUS_BY_LEVEL, FILTERS, MAP_POLYGON_PATH, MAP_POLYGON_HOLE } from '@/data/map';
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
  const token=useAuthStore((state) => state.token);
  console.log('zustand 저장 토큰: ', token);
  const token2 = localStorage.getItem('auth-storage');
  if (token2) {
    const parsed = JSON.parse(token2);
    const accessToken = parsed?.state?.token;

    console.log('localStorage 토큰: ', accessToken);
  } else {
    console.log('⚠️ No token found in localStorage');
  }

  const {toast} = useToast();
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
            <Polygon
              path={[MAP_POLYGON_PATH, MAP_POLYGON_HOLE]}
              strokeWeight={2}
              strokeColor={'#D32F2F'}
              strokeOpacity={0.6}
              fillColor={'#D32F2F'}
              fillOpacity={0.3}
            />
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
