// 지도 기반의 검색 페이지. 메인 페이지이자 진입 페이지.
// 도메인 상에서 "지도 도메인"

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/domain/SearchBar';
import CompanyCard from '@/components/domain/CompanyCard';
import { Map, MapMarker, CustomOverlayMap} from 'react-kakao-maps-sdk';
import mapData from '@/data/MapData.json';
import axios from 'axios';
import noImg from '@/assets/no-image.png';

const mockData = mapData.mockData;
// const companies = mapData.companies;
const companyInfo = mapData.companyInfo;
const isBookmarked = 'true';
const KTB = mapData.KTB;

interface Company {
  id: number;
  logoUrl: string;
  locationInfo: {
    latitude: number;
    longitude: number;
  };
}

export default function Main() {
  const [search, setSearch] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_KEY}&autoload=false&libraries=clusterer,drawing`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setLoaded(true);
        const fetchCompanies = async () => {
          try {
            const { data } = await axios.get('/mock/companies.json', {
              params: {
                latitude: KTB.lat,
                longitude: KTB.lng,
                radius: 1000,
              },
            });
            setCompanies(data.data.companies);
            console.log(companies)
          } catch (error) {
            console.error('기업 리스트 조회 실패:', error);
          }
        };
        fetchCompanies();
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
          {companies.map((company, index) => {
          const isOpen = openCardIndex === index;
          const position = {
            lat: company.locationInfo.latitude,
            lng: company.locationInfo.longitude,
          };
          console.log(company.locationInfo.latitude)
          return (
            <div key={company.id}>
              <MapMarker
                position={position}
                image={{
                  src: company.logoUrl ?? noImg,
                  size: { width: 24, height: 35 },
                }}
                clickable={true}
                onClick={() => setOpenCardIndex(isOpen ? null : index)}
              />
              {isOpen && (
                <CustomOverlayMap xAnchor={0.5} yAnchor={1.22} position={{ lat: position.lat, lng: position.lng }} clickable={true}>
                  <CompanyCard
                    companyName={companyInfo.name}
                    bookmarkCount={companyInfo.wishCount}
                    tags={companyInfo.keywords.slice(0, 4).map((k) => k.content) ?? []}
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
                </CustomOverlayMap>
              )}
            </div>
          );
        })}
        </Map>
      )}
    </>
  );
}
