'use client';
// 지도 기반의 검색 페이지. 메인 페이지이자 진입 페이지.
// 도메인 상에서 "지도 도메인"
/* global kakao */

import { SearchBar } from '@/src/features/map/ui/SearchBar';
import { FilterGroup } from '@/src/features/map/ui/filter';
import { Button } from '@/src/widgets/ui/button';
import { PiCrosshairSimple } from 'react-icons/pi';

import KakaoMap from '@/src/features/map/ui/KakaoMap';

import { useMapEvents } from '@/src/features/map/lib/useMapEvents';

import { FILTERS } from '@/src/features/map/config/map';

import { useNotificationSSE } from '@/src/shared/model/useNotificationSSE';

export default function Page() {
  const { handleMoveToCurrentLocation } = useMapEvents();

  useNotificationSSE();

  return (
    <>
      <SearchBar />
      <div className="relative flex justify-center w-full h-[calc(100%-4rem)] top-16">
        {/* 필터 UI를 지도 위에 고정 */}
        <div className="absolute left-0 right-0 z-10 px-2 bg-gradient-to-b from-white/60 from-60% to-transparent">
          <div className="max-w-full ">
            <FilterGroup filters={FILTERS} />
          </div>
        </div>

        <KakaoMap />

        {/* 내 위치 찾기 버튼 */}
        <div className="absolute bottom-6 left-4 z-40 [&_svg]:size-8">
          <Button
            label={<PiCrosshairSimple />}
            variant="icon"
            className="bg-white rounded-full w-12 h-12 m-0 p-2 shadow-md"
            onClick={() => {
              handleMoveToCurrentLocation();
            }}
          />
        </div>
      </div>
    </>
  );
}
