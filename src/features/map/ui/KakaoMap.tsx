'use client';

/* global kakao */

import MapOverlay from '@/src/entities/map/ui/MapOverlay';
import { MAP_POLYGON_PATH, MAP_POLYGON_HOLE, KTB } from '@/src/features/map/config/map';
import { CLUSTER_STYLES } from '@/src/features/map/config/clusterStyles';

import { safeCluster } from '@/src/entities/map/lib/safeCluster';
import { useMapEvents } from '@/src/features/map/lib/useMapEvents';
import { useCompanyList } from '@/src/entities/map/api/useCompanyList';

import { useMarkerStore } from '@/src/features/map/model/marker';
import { useMapStore } from '@/src/features/map/model/map';
import { useMapRefStore } from '@/src/features/map/model/mapRef';
import { useCompanyStore } from '@/src/shared/lib/company';

import { useState, useEffect, useRef } from 'react';
import { Map, MarkerClusterer, Polygon } from 'react-kakao-maps-sdk';

export default function KakaoMap() {
  const { setMapRef } = useMapRefStore();
  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      setMapRef(mapRef.current);
    }
  }, [mapRef.current]);

  const { openCardIndex, setOpenCardIndex, highlightedCompanyId } = useCompanyStore();
  const companyDisabledMap = useMarkerStore((state) => state.companyDisabledMap);
  const { handleMapMove } = useMapEvents();
  const { center, zoom } = useMapStore();
  const { data: companies = [] } = useCompanyList();

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        setLoaded(true);
      });
    }
  }, []);

  if (!loaded)
    return <div className="flex h-full items-center justify-center">지도를 불러오는 중...</div>;

  return (
    <Map
      ref={mapRef}
      center={{
        lat: center?.lat ?? KTB.lat,
        lng: center?.lng ?? KTB.lng,
      }}
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
  );
}
