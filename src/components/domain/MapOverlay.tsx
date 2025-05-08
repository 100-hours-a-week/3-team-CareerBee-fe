import { MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import CompanyCard from '@/components/domain/CompanyCard';
import noImg from '@/assets/no-image.png';
import { useCompanyStore } from '@/store/company';
import { useAuthStore } from '@/store/auth';
import { instance as axios } from '@/lib/axios';
import { useCompanyDetail } from '@/hooks/useCompanyDetail';
import { CompanyProps } from '@/pages/Main'

interface MapOverlayProps {
  company: CompanyProps;
  index: number;
  isOpen: boolean;
  disabled: boolean;
}

export default function MapOverlay({
  company,
  index,
  isOpen,
  disabled,
}: MapOverlayProps) {
  const {
    companyInfo,
    setOpenCardIndex,
    isBookmarked,
    setIsBookmarked,
  } = useCompanyStore();
  const token = useAuthStore((state) => state.token);

  const position = {
    lat: company.locationInfo.latitude,
    lng: company.locationInfo.longitude,
  };

  const { fetchCompanyDetail } = useCompanyDetail(company.id, index);

  const handleToggleBookmark = async () => {
    if (!token) return;

    const url = `${import.meta.env.VITE_API_URL}/api/v1/members/wish-companies/${company.id}`;
    try {
      if (isBookmarked === 'true') {
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsBookmarked('false');
      } else if (isBookmarked === 'false') {
        await axios.post(url, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsBookmarked('true');
      }
    } catch (error) {
      console.error('관심기업 토글 실패:', error);
    }
  };

  return (
    <>
      {!disabled &&
          <MapMarker
            position={position}
            image={{
              src: company.markerUrl ?? noImg,
              size: { width: 64, height: 64 },
            }}
            clickable={true}
            onClick={fetchCompanyDetail}
          />
      }
      {isOpen && companyInfo && (
        <CustomOverlayMap xAnchor={0.5} yAnchor={1.22} position={position} clickable={true}>
          <CompanyCard
            companyId={companyInfo.id}
            companyName={companyInfo.name}
            bookmarkCount={companyInfo.wishCount}
            tags={companyInfo.keywords.slice(0, 4).map((k) => k.content) ?? []}
            imageUrl={companyInfo.logoUrl}
            onClose={() => setOpenCardIndex(null)}
            {...(token
              ? {
                  onToggleBookmark: handleToggleBookmark,
                  isBookmarked: isBookmarked,
                }
              : {
                  isBookmarked: 'disabled',
                })}
          />
        </CustomOverlayMap>
      )}
    </>
  );
}