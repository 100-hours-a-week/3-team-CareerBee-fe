// 지도 기반의 검색 페이지. 메인 페이지이자 진입 페이지.
// 도메인 상에서 "지도 도메인"

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/domain/SearchBar';
import CompanyCard from '@/components/domain/CompanyCard';
import { Map, MapMarker, CustomOverlayMap} from 'react-kakao-maps-sdk';
import mapData from '@/data/MapData.json';
import axios from 'axios';
import noImg from '@/assets/no-image.png';
import { useAuthStore } from '@/store/auth';

const KTB = mapData.KTB;

interface CompanyProps {
  id: number;
  logoUrl: string;
  locationInfo: {
    latitude: number;
    longitude: number;
  };
}

interface CompanyInfoProps{
  id: number;
  name: string;
  logoUrl: string;
  wishCount: number; 
  keywords: { content: string }[];
}

export default function Main() {
  const [search, setSearch] = useState('');
  const [loaded, setLoaded] = useState(false);

  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoProps>();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isBookmarked, setIsBookmarked] = useState<'true' | 'false' | 'disabled'>('disabled');

  const token = useAuthStore((state) => state.token);


  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.length < 1) {
        setSuggestions([]);
        return;
      }
      try {
        const { data } = await axios.get('https://api.careerbee.co.kr/api/v1/companies/search', {
          params: {
            keyword: search
          }
        });
        const names = data.data.matchingCompanies.map((company: { name: string }) => company.name);
        setSuggestions(names.slice(0, 8));
      } catch (error) {
        console.error('회사 검색 실패:', error);
      }
    };

    fetchSuggestions();
  }, [search]);

  const fetchCompanies = async (level: number) => {
    const radiusMap: Record<number, number> = {
      1: 100,
      2: 200,
      3: 300,
      4: 600,
      5: 1000,
      6: 1500,
      7: 2000,
      8: 2500,
      9: 3000,
      10: 4000,
      11: 5000,
      12: 6000,
      13: 8000,
      14: 10000,
    };
    const radius = radiusMap[level] ?? 1000;
    try {
      const { data } = await axios.get('https://api.careerbee.co.kr/api/v1/companies', {
        params: {
          latitude: KTB.lat,
          longitude: KTB.lng,
          radius,
        },
      });
      setCompanies(data.data.companies);
      console.log(data.data.companies);
    } catch (error) {
      console.error('기업 리스트 조회 실패:', error);
    }
  };

  const handleMarkerClick = async (companyId: number, index: number) => {
    setOpenCardIndex(openCardIndex === index ? null : index);
    try {
      const { data } = await axios.get(`https://api.careerbee.co.kr/api/v1/companies/${companyId}/summary`);
      setCompanyInfo(data.data);
      console.log(data.data);

      if (token) {
        try {
          const { data } = await axios.get(`https://api.careerbee.co.kr/api/v1/members/wish-companies/${companyId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsBookmarked(data.data.isWish ? 'true' : 'false');
          console.log('관심 기업 여부: ',data.data.isWish);
        } catch (error) {
          console.error('관심기업 여부 조회 실패:', error);
          setIsBookmarked('false');
        }
      } else {
        setIsBookmarked('disabled');
      }
    } catch (error) {
      console.error('기업 간단 정보 조회 실패:', error);
    }
  };

  const handleToggleBookmark = async (companyId: number) => {
    if (!token) return;

    const url = `https://api.careerbee.co.kr/api/v1/members/wish-companies/${companyId}`;
    try {
      if (isBookmarked === 'true') {
        await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsBookmarked('false');
      } else if (isBookmarked === 'false') {
        await axios.post(url, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsBookmarked('true');
      }
    } catch (error) {
      console.error('관심기업 토글 실패:', error);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_KEY}&autoload=false&libraries=clusterer,drawing`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setLoaded(true);
        
        fetchCompanies(3);
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
          suggestions={suggestions}
          onSuggestionSelect={(value: string) => setSearch(value)}
        />
      </div>
      {loaded && (
        <Map
          center={{ lat: KTB.lat, lng: KTB.lng }}
          className="w-[calc(100%+2rem)] h-full"
          level={3}
          onZoomChanged={(map) => {
            const level = map.getLevel()
            fetchCompanies(level);
          }}
        >
          {companies.map((company, index) => {
          const isOpen = openCardIndex === index;
          const position = {
            lat: company.locationInfo.latitude,
            lng: company.locationInfo.longitude,
          };
          return (
            <div key={company.id}>
              <MapMarker
                position={position}
                image={{
                  src: company.logoUrl ?? noImg,
                  size: { width: 50, height: 50 },
                }}
                clickable={true}
                onClick={() => {
                  setOpenCardIndex(isOpen ? null : index)
                  handleMarkerClick(company.id, index)
                }}
              />
              {isOpen && companyInfo && (
                <CustomOverlayMap xAnchor={0.5} yAnchor={1.22} position={{ lat: position.lat, lng: position.lng }} clickable={true}>
                  <CompanyCard
                    companyId={companyInfo.id}
                    companyName={companyInfo.name}
                    bookmarkCount={companyInfo.wishCount}
                    tags={companyInfo.keywords.slice(0, 4).map((k) => k.content) ?? []}
                    imageUrl={companyInfo.logoUrl}
                    onClose={() => setOpenCardIndex(null)}
                    {...(token
                      ? {
                          onToggleBookmark: () => handleToggleBookmark(companyInfo.id),
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
