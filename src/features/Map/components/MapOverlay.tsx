import { MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import CompanyCard from '@/features/Map/components/CompanyCard';
import noImg from '@/assets/no-image.png';
import { useCompanyStore } from '@/store/company';
import { useAuthStore } from '@/features/Member/store/auth';
import { useFetchCompanyCard } from '@/features/Map/hooks/useFetchCompanyCard';
import { CompanyProps } from '@/features/Map/Main'

interface MapOverlayProps {
  company: CompanyProps;
  index: number;
  isOpen: boolean;
  disabled: boolean;
  isHighlighted: boolean;
}

export default function MapOverlay({
  company,
  isOpen,
  disabled,
  isHighlighted,
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

  const { fetchCompanyDetail } = useFetchCompanyCard(company.id);


  // if(isOpen)
  //   console.log("🟢 companyInfo:", companyInfo);
  return (
    <>
      {!disabled &&
          <MapMarker
            position={position}
            image={{
              src: company.markerUrl ?? noImg,
              size: isHighlighted ? { width: 44, height: 60 } : { width: 37, height: 50 },
            }}
            clickable={true}
            onClick={fetchCompanyDetail}
            zIndex={isHighlighted ? 2 : 1}
          />
      }
      {isOpen && companyInfo && (
        <CustomOverlayMap xAnchor={0.5} yAnchor={1.22} position={position} clickable={true} zIndex={30}>
          <CompanyCard
            companyId={companyInfo.id}
            companyName={companyInfo.name}
            bookmarkCount={companyInfo.wishCount}
            tags={companyInfo.keywords.slice(0, 4).map((k) => k.content) ?? []}
            imageUrl={companyInfo.logoUrl}
            isLoggedIn={!!token}
            onClose={() => setOpenCardIndex(null)}
            {...(token
              ? {
                  isBookmarked: isBookmarked,
                }
              : {
                  isBookmarked: false,
                })}
            setIsBookmarked= {setIsBookmarked}
          />
        </CustomOverlayMap>
      )}
    </>
  );
}