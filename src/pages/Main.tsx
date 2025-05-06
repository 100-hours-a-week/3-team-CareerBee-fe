// 지도 기반의 검색 페이지. 메인 페이지이자 진입 페이지.
// 도메인 상에서 "지도 도메인"

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/domain/SearchBar';
import CompanyCard from '@/components/domain/CompanyCard';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import mapData from '@/data/MapData.json';

const mockData = mapData.mockData;
const companies = mapData.companies;
const companyInfo = mapData.companyInfo;
const isBookmarked = 'true';
const KTB = mapData.KTB;

export default function Main() {
  const [search, setSearch] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_KEY}&autoload=false&libraries=clusterer,drawing`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setLoaded(true);
      });
    };
    document.head.appendChild(script);
  }, []);
  return (
    <>
      <div className="py-2 w-full">
        <SearchBar
          placeholder="검색어를 입력하세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          suggestions={mockData}
          onSuggestionSelect={(value: string) => setSearch(value)}
        />
      </div>
      {loaded && (
        <Map
          center={{ lat: KTB.lat, lng: KTB.lng }}
          className="w-[calc(100%+2rem)] h-full"
          level={3}
        >
          {companies.map((company, index) => (
            <MapMarker
              key={`${company.id}-${company.locationInfo.latitude}-${company.locationInfo.longitude}`}
              position={{
                lat: company.locationInfo.latitude,
                lng: company.locationInfo.longitude,
              }}
              image={{
                src: company.logoUrl,
                size: { width: 24, height: 35 },
              }}
              onClick={() => setOpenCardIndex(index)}
            >
              {openCardIndex === index && (
                <CompanyCard
                  companyName={companyInfo.name}
                  bookmarkCount={companyInfo.wishCount}
                  tags={['카카오', '카카오엔터테인먼트', '집', '판교']}
                  imageUrl={companyInfo.logoUrl}
                  onClose={() => setOpenCardIndex(null)}
                  {...(isLoggedIn
                    ? {
                        onToggleBookmark: () => {},
                        isBookmarked: isBookmarked,
                      }
                    : {
                        isBookmarked: 'disabled',
                      })}
                />
              )}
            </MapMarker>
          ))}
        </Map>
      )}
    </>
  );
}
