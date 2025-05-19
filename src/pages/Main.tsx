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
  // // 디버그용 콘솔 찍기
  // console.count('🌀 Main 렌더링 횟수');
  // const token=useAuthStore((state) => state.token);
  // useEffect(() => {
  //   const token = useAuthStore.getState().token;
  //   console.log('zustand 저장 토큰:', token);
  //   const token2 = localStorage.getItem('auth-storage');
  //   if (token2) {
  //     const parsed = JSON.parse(token2);
  //     console.log('localStorage 토큰:', parsed?.state?.token);
  //   } else {
  //     console.log('⚠️ No token found in localStorage');
  //   }
  // }, [token]);

  const { search, setSearch, suggestions } = useSearchStore();
  useFetchSuggestions();

  
  const [loaded, setLoaded] = useState(false);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  
  const {
    openCardIndex,
    setOpenCardIndex
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
      // console.log(data.data.companies);
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
    setHighlightedCompanyId(null);

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

                setTimeout(() => {
                  fetchCompanies(latitude, longitude, 3);
                }, 300);
              }
            } catch (error) {
              console.error('❌ 기업 위치 정보 조회 실패', error);
            }
          }}
        />
      <div className="relative flex item-center justify-center w-full h-full top-16 pb-16">
        {loaded && (
          <Map
            ref={mapRef}
            center={{ lat: KTB.lat, lng: KTB.lng }}
            className="w-full h-full pb-16"
            level={3}
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
              styles={[
                {
                  width: '30px',
                  height: '30px',
                  background: 'radial-gradient(circle, rgba(26, 143, 227, 0.8) 40%, rgba(0, 0, 0, 0) 100%', // deep blue
                  borderRadius: '50%',
                  color: '#fff',
                  textAlign: 'center',
                  lineHeight: '30px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  boxShadow: '0 0 6px 4px rgba(26, 143, 227, 0.3)',
                },
                {
                  width: '45px',
                  height: '45px',
                  background: 'radial-gradient(circle, rgba(93, 162, 113, 0.8) 40%, rgba(0, 0, 0, 0) 100% )', // teal
                  borderRadius: '50%',
                  color: '#fff',
                  textAlign: 'center',
                  lineHeight: '45px',
                  fontSize: '14px',
                  fontWeight: 'bold', 
                  boxShadow: '0 0 6px 4px rgba(93, 162, 113, 0.3)',
                },
                {
                  width: '60px',
                  height: '60px',
                  background: 'radial-gradient(circle, rgba(247, 199, 70, 0.9) 40%, rgba(0, 0, 0, 0) 100%', // yellow
                  borderRadius: '50%',
                  color: '#fff',
                  textAlign: 'center',
                  lineHeight: '60px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  boxShadow: '0 0 10px 6px rgba(254, 228, 64, 0.3)',
                },
                {
                  width: '70px',
                  height: '70px',
                  background: 'radial-gradient(circle, rgba(231, 111, 81, 0.8) 40%, rgba(0, 0, 0, 0) 100% )',
                  borderRadius: '50%',
                  color: '#fff',
                  textAlign: 'center',
                  lineHeight: '70px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 0 10px 6px rgba(231, 111, 81, 0.3)',
                },
              ]}
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
