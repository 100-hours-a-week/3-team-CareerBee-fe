'use client';
// 지도 기반의 검색 페이지. 메인 페이지이자 진입 페이지.
// 도메인 상에서 "지도 도메인"

import { SearchBar } from '@/src/features/map/ui/SearchBar';
import { FilterGroup } from '@/src/features/map/ui/filter';
import { FindMeButton } from '@/src/features/map/ui/FindMeButton';
import KakaoMap from '@/src/features/map/ui/KakaoMap';

import { FILTERS } from '@/src/features/map/config/map';

export default function Page() {
  return (
    <>
      <SearchBar />
      <div className="relative flex justify-center w-full h-[calc(100%-4rem)] top-16">
        <div className="absolute max-w-full left-0 right-0 z-10 px-2 bg-gradient-to-b from-white/60 from-60% to-transparent">
          <FilterGroup filters={FILTERS} />
        </div>
        <KakaoMap />
        <FindMeButton />
      </div>
    </>
  );
}
