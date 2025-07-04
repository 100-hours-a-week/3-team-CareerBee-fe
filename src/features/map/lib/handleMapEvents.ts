import { toast } from '@/src/shared/model/useToast';

import { LatLng } from '@/src/features/map/model/map';

export const handleMapMove = (
  map: kakao.maps.Map,
  options: {
    setCenter: (_center: LatLng) => void;
    setZoom:  (_zoom: number) => void;
    setHighlightedCompanyId: (_id: number | null) => void;
  }
) => {
  const level = map.getLevel();
  const latlng = map.getCenter();

  options.setHighlightedCompanyId(null);
  options.setCenter({
    lat: latlng.getLat(),
    lng: latlng.getLng(),
  });
  options.setZoom(level);
};

export const handleMoveToCurrentLocation = (mapRef: React.MutableRefObject<kakao.maps.Map | null>) => {
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
        toast({ title: `위치 권한이 차단되어 있어요.\n브라우저 설정에서 권한을 허용해주세요.` });
      } else {
        toast({ title: '위치 정보를 가져올 수 없습니다.' });
      }
    },
  );
};