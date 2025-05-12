import { MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import CompanyCard from '@/components/domain/CompanyCard';
import noImg from '@/assets/no-image.png';
import { useCompanyStore } from '@/store/company';
import { useAuthStore } from '@/store/auth';
import { useFetchCompanyCard } from '@/hooks/useFetchCompanyCard';
import { CompanyProps } from '@/pages/Main'
import { handleToggleBookmark as toggleBookmarkUtil } from '@/lib/toggleBookmark';

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

  const { fetchCompanyDetail } = useFetchCompanyCard(company.id, index);

  const handleToggleBookmark = () => {
    if (!token || isBookmarked==="disabled") return;
    toggleBookmarkUtil(token, company.id, isBookmarked, setIsBookmarked);
  };
  // if(isOpen)
  //   console.log("🟢 companyInfo:", companyInfo);
  return (
    <>
      {!disabled &&
          <MapMarker
            position={position}
            image={{
              src: company.markerUrl ?? noImg,
              size: { width:37 ,height: 50 },
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