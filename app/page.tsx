'use client';
// 지도 기반의 검색 페이지. 메인 페이지이자 진입 페이지.
// 도메인 상에서 "지도 도메인"
/* global kakao */

import { SearchBar } from '@/src/features/map/ui/SearchBar';
import { FilterGroup } from '@/src/features/map/ui/filter';
import MapOverlay from '@/src/features/map/ui/MapOverlay';
import { Button } from '@/src/widgets/ui/button';
import { PiCrosshairSimple } from 'react-icons/pi';

import { useCompanyStore } from '@/src/shared/lib/company';
import { useSearchStore } from '@/src/features/map/model/search';
import { useMarkerStore } from '@/src/features/map/model/marker';
import { useMapStore } from '@/src/features/map/model/map';

import { safeCluster } from '@/src/entities/map/lib/safeCluster';
import { useCompanyList } from '@/src/entities/map/api/useCompanyList';
import { handleMapMove, handleMoveToCurrentLocation } from '@/src/features/map/lib/handleMapEvents';

import { FILTERS, MAP_POLYGON_PATH, MAP_POLYGON_HOLE } from '@/src/features/map/config/map';
import { CLUSTER_STYLES } from '@/src/features/map/config/clusterStyles';

import { Map, MarkerClusterer, Polygon } from 'react-kakao-maps-sdk';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const { openCardIndex, setOpenCardIndex, highlightedCompanyId } = useCompanyStore();
  const { search, setSearch, suggestions } = useSearchStore();
  const companyDisabledMap = useMarkerStore((state) => state.companyDisabledMap);
  const { center, zoom } = useMapStore();

  const [loaded, setLoaded] = useState(false);

  const { data: companies = [] } = useCompanyList(center, zoom);

  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_KAKAOMAP_KEY}&autoload=false&libraries=clusterer,drawing`;
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

  return (
    <>
      <SearchBar
        placeholder="검색어를 입력하세요."
        value={search}
        onChange={(e: { target: { value: string } }) => setSearch(e.target.value)}
        suggestions={suggestions}
        // setHighlightedCompanyId={setHighlightedCompanyId}
        mapRef={mapRef}
      />
      <div className="relative flex item-center justify-center w-full h-[calc(100%-4rem)] top-16">
        {loaded && (
          <Map
            ref={mapRef}
            center={{ lat: center.lat, lng: center.lng }}
            className="w-full h-full pb-16"
            level={zoom}
            onZoomChanged={handleMapMove}
            onDragEnd={handleMapMove}
            onClick={() => setOpenCardIndex(null)}
            minLevel={8}
          >
            <MarkerClusterer
              averageCenter={true}
              minLevel={4}
              minClusterSize={3}
              onCreate={(clusterer) => safeCluster(clusterer, mapRef.current)}
              calculator={[10, 30, 50, 100]}
              styles={CLUSTER_STYLES}
            >
              {companies.map((company, index) => (
                <MapOverlay
                  key={company.id}
                  company={company}
                  index={index}
                  isOpen={openCardIndex === company.id}
                  disabled={companyDisabledMap[company.id] ?? false}
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
        <div className="absolute bottom-6 left-4 z-40 [&_svg]:size-8">
          <div>
            <Button
              label={<PiCrosshairSimple />}
              variant="icon"
              className="bg-white rounded-full w-12 h-12 m-0 p-2 shadow-md"
              onClick={() => {
                handleMoveToCurrentLocation(mapRef);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
