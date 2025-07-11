/* global kakao */

// 타입 안정성을 위한 SafeCluster
type SafeCluster = kakao.maps.Cluster & {
  _markers?: (kakao.maps.Marker | kakao.maps.CustomOverlay)[];
  _clusterMarker?: kakao.maps.Marker;
};

export const safeCluster = (_target: kakao.maps.MarkerClusterer, map: kakao.maps.Map | null) => {
  if (!map) return;

  const clusterer = _target as unknown as {
    _clusters: SafeCluster[];
  };

  clusterer._clusters.forEach((cluster) => {
    const markers = cluster._markers ?? [];

    // 실제 마커만 필터링(실제 마커: u, 기업 간단 카드: I)
    const realMarkers = markers.filter((marker) => marker.constructor.name !== 'I');

    if (realMarkers.length === markers.length - 1 && cluster._clusterMarker) {
      // 1. 클러스터 마커 숨기기
      cluster._clusterMarker.setVisible(false);

      // 2. 내부 마커 직접 지도에 표시
      markers.forEach((marker) => {
        marker.setMap(map);
      });
    }
  });
};
