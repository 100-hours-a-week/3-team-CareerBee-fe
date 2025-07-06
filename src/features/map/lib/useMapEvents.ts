import { toast } from '@/src/shared/model/useToast';

import { useMapStore } from '@/src/features/map/model/map';
import { useCompanyStore } from '@/src/shared/lib/company';
import { useMapRefStore } from '@/src/features/map/model/mapRef';

export function useMapEvents() {
  const { setCenter, setZoom } = useMapStore();
  const { setHighlightedCompanyId } = useCompanyStore();

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
    const map = useMapRefStore((state) => state.mapRef);
    if (!map) return;


    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentPos = new window.kakao.maps.LatLng(latitude, longitude);
        map?.setCenter(currentPos);

        setTimeout(() => {
          if (map) {
            handleMapMove(map);
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

  return { handleMapMove, handleMoveToCurrentLocation };
}