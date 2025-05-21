// 지도 기반의 검색 페이지. 메인 페이지이자 진입 페이지.
// 도메인 상에서 "지도 도메인"

import { useState, useEffect, useRef } from 'react';
import { SearchBar } from '@/components/domain/SearchBar';
import { FilterGroup } from '@/components/ui/filter'
import { Map, MarkerClusterer, Polygon  } from 'react-kakao-maps-sdk';
import MapOverlay from '@/components/domain/MapOverlay';
import { useCompanyStore } from '@/store/company';
import { useSearchStore } from '@/store/search';
import { useMarkerStore } from '@/store/marker';
import { useFetchSuggestions } from '@/hooks/useFetchSuggestions';

import { instance as axios } from '@/lib/axios';

// import { useAuthStore  } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { PiCrosshairSimple } from "react-icons/pi";

import {toast} from '@/hooks/useToast';

import { useMapStore } from '@/store/map';
import { RADIUS_BY_LEVEL, FILTERS, MAP_POLYGON_PATH, MAP_POLYGON_HOLE } from '@/data/map';

import { useQuery } from '@tanstack/react-query';
// import { Loader } from '@/components/ui/loader';
import { CLUSTER_STYLES } from '@/assets/clusterStyles';

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
  const { search, setSearch, suggestions } = useSearchStore();
  useFetchSuggestions();
  
  const [loaded, setLoaded] = useState(false);
  // const [companies, setCompanies] = useState<CompanyProps[]>([]);
  
  const { openCardIndex, setOpenCardIndex } = useCompanyStore();
  const { center, zoom, setCenter, setZoom } = useMapStore();

  const { markerDisabledMap } = useMarkerStore();

  const mapRef = useRef<kakao.maps.Map | null>(null);

const {
  data: companies = [],
  // isFetching,
} = useQuery<CompanyProps[], Error>({
  queryKey: ['companyList', center.lat, center.lng, zoom],
  queryFn: async () => {
    const radius = RADIUS_BY_LEVEL[zoom] ?? 1000;
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/companies`, {
      params: { latitude: center.lat, longitude: center.lng, radius },
    });
    // const { data } = await axios.get('/mock/companies.json');  //🚨 목 데이터로 작업할 때만 켜기
    // console.log("🐳 api fetch: ", center.lat, " ", center.lng, " ", zoom)
    return data.data.companies; 
  },
  placeholderData: (previous) => previous,
});

// useEffect(()=>{
//   console.log("🐝 ", center.lat, " ", center.lng, " ", zoom)
// },[center, zoom])
  

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_KEY}&autoload=false&libraries=clusterer,drawing`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
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
    setHighlightedCompanyId(null);
    setCenter({
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    });
    setZoom(level);
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

  // 타입 안정성을 위한 SafeCluster
  type SafeCluster = kakao.maps.Cluster & {
    _markers?: (kakao.maps.Marker | kakao.maps.CustomOverlay)[];
    _clusterMarker?: kakao.maps.Marker;
  };

  const onCreate = (_target: kakao.maps.MarkerClusterer) => {
    const map = mapRef.current;
    if (!map) return;
  
    const clusterer = _target as unknown as {
      _clusters: SafeCluster[];
    };
  
    clusterer._clusters.forEach((cluster) => {
      const markers = cluster._markers ?? [];
  
      // 실제 마커만 필터링(실제 마커: u, 기업 간단 카드: I)
      const realMarkers = markers.filter(
        (marker) => marker.constructor.name !== 'I'
      );
  
      if (realMarkers.length === markers.length-1 && cluster._clusterMarker) {
        // 1. 클러스터 마커 숨기기
        cluster._clusterMarker.setVisible(false);
  
        // 2. 내부 마커 직접 지도에 표시
        markers.forEach((marker) => {
          marker.setMap(map);
        });
      }
    });
  };

  const [highlightedCompanyId, setHighlightedCompanyId] = useState<number | null>(null);

  return (
    <>
        <SearchBar
          placeholder="검색어를 입력하세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          suggestions={suggestions}
          onSuggestionSelect={async (suggestion) => {
            try {
              // console.log('🔎', suggestion)
              const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/companies/${suggestion.id}/locations`);
              const { latitude, longitude } = res.data.data.locationInfo;

              // console.log('🔎', latitude, ' ', longitude)
              // setSearch(suggestion.name);
              setHighlightedCompanyId(suggestion.id);

              const map = mapRef.current;
              if (map) {
                const newCenter = new window.kakao.maps.LatLng(latitude, longitude);
                map.setLevel(3);
                map.setCenter(newCenter);

                setCenter({
                  lat: newCenter.getLat(),
                  lng: newCenter.getLng(),
                });
                setZoom(3);
              }
            } catch (error) {
              console.error('❌ 기업 위치 정보 조회 실패', error);
            }
          }}
        />
      <div className="relative flex item-center justify-center w-full h-full top-16 pb-16">
        {/* {isFetching && <div className='absolute z-50 mt-72'><Loader/></div>} */}
        {loaded && (
          <Map
            ref={mapRef}
            center={{ lat: center.lat , lng: center.lng }}
            className="w-full h-full pb-16"
            level={zoom}
            onZoomChanged={handleMapMove}
            onDragEnd={handleMapMove}
            onClick={() => setOpenCardIndex(null)} 
          >
            <MarkerClusterer
              averageCenter={true}
              minLevel={4}
              minClusterSize={3}
              onCreate={onCreate}
              calculator={[10, 30, 50, 100]}
              styles={CLUSTER_STYLES}
            >
            {companies.map((company, index) => (
              <MapOverlay
                key={company.id}
                company={company}
                index={index}
                isOpen={openCardIndex === company.id}
                disabled={markerDisabledMap[company.id] ?? false}
                isHighlighted={highlightedCompanyId === company.id}
              />
            ))}
            </MarkerClusterer>
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
        <div className="absolute left-0 right-0 z-10 px-2 bg-gradient-to-b from-white/60 from-60% to-transparent">
          <div className="max-w-full ">
            <FilterGroup filters={FILTERS} companies={companies} />
          </div>
        </div>

        {/* 내 위치 찾기 버튼 */}
        <div className="absolute bottom-[88px] left-3 z-40 [&_svg]:size-8">
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
